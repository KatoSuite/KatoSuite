# Vercel Deployment Protection Bypass

Vercel allows protected deployments to be accessed without logging in by
passing a bypass token.

## Usage

Include the token in each request using either method:

- **HTTP header**

  ```http
  x-vercel-protection-bypass: 23683695763603153796092574279032
  ```

- **Query parameter**

  ```
  https://your-site.vercel.app?x-vercel-protection-bypass=23683695763603153796092574279032
  ```

The same token works for custom domains. For example:

```
https://www.katosuite.com?x-vercel-protection-bypass=23683695763603153796092574279032
```

Share the token only with trusted users since it grants access without
authentication.
