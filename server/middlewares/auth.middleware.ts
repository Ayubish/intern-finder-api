import { auth } from "../lib/auth.js";
import { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";

declare global {
  namespace Express {
    interface Request {
      user?: any; // You can type this better if you know the structure
    }
  }
}

export const verifyUser = async (req:Request, res:Response, next:NextFunction) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session)
    return res.status(401).json({ error: "Access Denied. No token provided." });

  req.user = session.user;
  next();
};