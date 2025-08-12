codex/create-security-middleware-with-helmet-and-cors
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const security = express.Router();

// Apply common security headers
security.use(helmet());

// Restrict cross-origin requests to a configured origin
security.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);

// Additional headers that Helmet does not configure by default
security.use((_, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

export default security;

import helmet from "helmet";
import cors from "cors";

export const security = [
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "img-src": ["'self'","data:","https:"],
        "script-src": ["'self'","'unsafe-inline'"],
        "style-src": ["'self'","'unsafe-inline'"],
        "connect-src": ["'self'", process.env.SUPABASE_URL || ""]
      }
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" }
  }),
  cors({ origin: process.env.CORS_ORIGIN?.split(",") || [process.env.CORS_ORIGIN], credentials: true })
];
main
