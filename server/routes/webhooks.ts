import express from "express";
import stripePackage from "stripe";
import rawBody from "raw-body"; // placeholder raw middleware
import db from "../db"; // placeholder db

const stripe = new stripePackage(process.env.STRIPE_SECRET || "");
const router = express.Router();

router.post("/api/billing/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET || "");
  } catch (e: any) {
    return res.status(400).send(`Webhook Error: ${e.message}`);
  }

  const validTypes = new Set([
    "checkout.session.completed",
    "invoice.payment_succeeded",
    "customer.subscription.updated",
    "customer.subscription.deleted"
  ]);

  if (validTypes.has(event.type)) {
    const obj: any = event.data.object;
    const meta = obj.metadata || {};
    const userId = meta.userId;
    if (userId) {
      const user = await db.getUser(userId);
      if (user) {
        if (meta.plan) user.plan = meta.plan;
        if (meta.addons) user.addons = JSON.parse(meta.addons);
        user.trusted = user.plan !== "free";
        await db.saveUser(user);
      }
    }
  }
  res.sendStatus(200);
});

export default router;
