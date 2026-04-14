import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error.util";
import { jwtUtil, JwtPayload } from "../utils/jwt.util";

const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    next(new AppError(401, "Authorization token is required"));
    return;
  }

  try {
    const token = authorization.replace("Bearer ", "");
    const decoded = jwtUtil.verifyAccessToken(token) as JwtPayload;
console.log("Decoded token:", decoded);
    // Attach the full payload to req.user
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch {
    next(new AppError(401, "Invalid or expired access token"));
  }
};

const authorize = (...roles: Array<"customer" | "admin">) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError(401, "Authentication required"));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(new AppError(403, "You do not have permission to access this resource"));
      return;
    }

    next();
  };
};


export { authenticate, authorize };
