 codex/create-security-middleware-with-helmet-and-cors
import express from 'express';
import rateLimit from 'express-rate-limit';
import security from './security';

const app = express();

app.disable('x-powered-by');

// Apply security headers and CORS handling
app.use(security);

// Rate limit to 120 requests per minute
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
  }),
);

// Parse JSON bodies with a 1 MB limit
app.use(express.json({ limit: '1mb' }));

import express from "express";
import { security } from "./security";
import billingRoutes from "./routes/billing";
import webhookRoutes from "./routes/webhooks";
import shopRoutes from "./routes/shop";
import githubRoutes from "./routes/github";

const app = express();

security.forEach(mw => app.use(mw));
app.use(express.json({ limit: "1mb" }));

app.use(billingRoutes);
app.use(webhookRoutes);
app.use(shopRoutes);
app.use(githubRoutes);
0gwhhv-codex/set-up-katosuite-github-app

main
 main

export default app;
