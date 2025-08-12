create table if not exists github_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  github_user_id bigint not null,
  github_login text not null,
  github_name text,
  avatar_url text,
  access_token text,
  token_scope text,
  token_expires_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, github_user_id)
);

create table if not exists github_app_installs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  installation_id bigint not null,
  account_login text not null,
  account_type text not null,
  repositories jsonb default '[]',
  created_at timestamptz default now(),
  unique(installation_id)
);
