import express from "express";
import rateLimit from "express-rate-limit";
import { security } from "./security";
import billingRoutes from "./routes/billing";
import webhookRoutes from "./routes/webhooks";
import shopRoutes from "./routes/shop";

const app = express();

security.forEach(mw => app.use(mw));
app.use(express.json({ limit: "1mb" }));
app.use(rateLimit({ windowMs: 60 * 1000, max: 120 }));

app.use(billingRoutes);
app.use(webhookRoutes);
app.use(shopRoutes);

export default app;
