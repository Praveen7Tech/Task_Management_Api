import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { StatusCode } from "../../../common/constants/status.enum";
import { MESSAGES } from "../../../common/constants/message";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

const ACCESS_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET!;

export const authenticationHandler = (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.cookies?.accessToken;

    if (!cookie) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: MESSAGES.UNAUTHORIZED });
    }

    try {
        const decoded = jwt.verify(cookie, ACCESS_TOKEN_SECRET) as { id: string; email: string };
        
        req.user = { 
            id: decoded.id, 
            email: decoded.email 
        };
        
        next();
    } catch (error) {
        console.error("Authorization error:", error);
        return res.status(StatusCode.UNAUTHORIZED).json({ message: "Invalid or expired token" });
    }
};
