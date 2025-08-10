import express from "express";
const router = express.Router();

router.get("/api/shop/catalog", async (_req, res) => {
  res.json({
    items: [
      { sku:"LP-ALLABOUTME", title:"All About Me (Lesson Pack)", price_cents:699, category:"lesson", image_url:"/img/shop/allaboutme.jpg" },
      { sku:"WS-ALPHATRACE", title:"Alphabet Tracing Pack", price_cents:399, category:"worksheet", image_url:"/img/shop/alpha.jpg" },
      { sku:"CB-FEELINGS",   title:"Feelings Coloring Book", price_cents:499, category:"coloring", image_url:"/img/shop/feelings.jpg" }
    ],
    bundles: [
      { sku:"BNDL-BTS", title:"Back to School Pack", price_cents:1299, includes:["LP-ALLABOUTME","WS-ALPHATRACE","CB-FEELINGS"] }
    ]
  });
});

export default router;
