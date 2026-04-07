import { NextFunction, Request, Response } from "express";

export const cookieToHeader = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken;
  
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  next();
};