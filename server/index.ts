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

export default app;
