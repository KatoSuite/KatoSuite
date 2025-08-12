import { Pool } from "pg";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = {
  async getUserFromSession(req: any) {
    const userId = req.user?.id || null;
    if (!userId) return null;
    const { rows } = await pool.query("select * from users where id=$1", [userId]);
    return rows[0] || null;
  },
  async upsertGitHubAccount(a: any) {
    await pool.query(
      `
      insert into github_accounts (user_id, github_user_id, github_login, github_name, avatar_url, access_token, token_scope, token_expires_at)
      values ($1,$2,$3,$4,$5,$6,$7,$8)
      on conflict (user_id, github_user_id) do update set
        github_login=excluded.github_login,
        github_name=excluded.github_name,
        avatar_url=excluded.avatar_url,
        access_token=excluded.access_token,
        token_scope=excluded.token_scope,
        token_expires_at=excluded.token_expires_at
    `,
      [
        a.user_id,
        a.github_user_id,
        a.github_login,
        a.github_name,
        a.avatar_url,
        a.access_token,
        a.token_scope,
        a.token_expires_at
      ]
    );
  },
  async upsertInstall(i: any) {
    await pool.query(
      `
      insert into github_app_installs (user_id, installation_id, account_login, account_type, repositories)
      values ($1,$2,$3,$4,$5)
      on conflict (installation_id) do update set
        user_id=excluded.user_id,
        account_login=excluded.account_login,
        account_type=excluded.account_type,
        repositories=excluded.repositories
    `,
      [i.user_id || null, i.installation_id, i.account_login, i.account_type, JSON.stringify(i.repositories || [])]
    );
  },
  async lookupUserIdByGitHubAccount(githubUserId: number) {
    const { rows } = await pool.query("select user_id from github_accounts where github_user_id=$1 limit 1", [githubUserId]);
    return rows[0]?.user_id || null;
  }
};
