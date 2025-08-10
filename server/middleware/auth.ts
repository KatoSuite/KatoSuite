import { Request, Response, NextFunction } from "express";

export default function auth(req: any, res: Response, next: NextFunction) {
  req.user = { id: "user", email: "user@example.com", plan: "free", addons: [] };
  next();
}
