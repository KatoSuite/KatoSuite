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

export default app;
