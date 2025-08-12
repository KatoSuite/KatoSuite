# Root Directory and Skipping Unaffected Projects

In some projects, the top-level directory of the repository may not be the root directory of the app you'd like to build. For such cases, you can specify the **Root Directory** in Vercel project settings.

- Your app will not be able to access files outside of that directory, and `..` cannot be used to move up a level.
- This setting also applies to the Vercel CLI. Instead of running `vercel <directory-name>` to deploy, specify the directory here so you can run `vercel` from the root.
- If you update the root directory setting, it will be applied on your next deployment.

## Skipping Unaffected Projects in a Monorepo

In a monorepo, you can skip deployments for projects that were not affected by a commit.

1. Navigate to the **Build and Deployment** page of your Project Settings.
2. Scroll down to **Root Directory**.
3. Enable the **Skip deployment** switch.

_Last updated on July 18, 2025._
