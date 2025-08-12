const hits = new Map<string, number[]>();

export function rateLimit(req: any, res: any, next: any) {
  const key = req.ip + ":" + (req.path || "");
  const now = Date.now();
  const windowMs = 60 * 1000;
  const limit = Number(process.env.RATE_LIMIT_PER_MINUTE || 120);
  const arr = (hits.get(key) || []).filter(t => now - t < windowMs);
  arr.push(now);
  hits.set(key, arr);
  if (arr.length > limit) return res.status(429).json({ error: "rate_limited" });
  next();
}
