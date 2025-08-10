import express from "express";
import stripePackage from "stripe";
import auth from "../middleware/auth"; // placeholder auth middleware
import products from "../billing/products.json" assert { type: "json" };

const stripe = new stripePackage(process.env.STRIPE_SECRET || "");
const router = express.Router();

router.post("/api/billing/checkout", auth, async (req, res) => {
  const { plan, addons = [] } = req.body;
  const price = (products as any).priceIds[plan as keyof typeof products.priceIds];
  if (!price) return res.status(400).json({ error: "Unknown plan" });

  const line_items: any[] = [{ price, quantity: 1 }];
  addons.forEach((a: string) => {
    if ((products as any).addonIds[a as keyof typeof products.addonIds]) {
      line_items.push({ price: (products as any).addonIds[a as keyof typeof products.addonIds], quantity: 1 });
    }
  });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: req.user.email,
    success_url: `${process.env.BASE_URL}/success?plan=${plan}`,
    cancel_url: `${process.env.BASE_URL}/pricing`,
    metadata: { userId: req.user.id, plan, addons: JSON.stringify(addons) },
    line_items
  });
  res.json({ url: session.url });
});

export default router;
