import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import passport from "passport";

import { JwtPayload, UserAccessLevel } from "../types";
import { logger, sendError } from "../helpers";
import { messages } from "../constants";
import { AccessLevel } from "database/Admin";

export const authVerifier = {
  verifyAccessToken: (req: Request|any, res: Response, next: NextFunction) =>
    passport.authenticate(
      "jwt",
      { session: false },
      (err: Error, jwtPayload: JwtPayload, info: { message: string }) => {
        if (err) {
          return next(createError(500, err));
        }

        if (!jwtPayload) {
          const { message } = info || {};
          return next(createError(401, message ?? messages.INVALID_TOKEN));
        }

        req.userId = jwtPayload.id;
        req.userRole = jwtPayload.role;
        req.tokenExp = jwtPayload.exp;

        return next();
      },
    )(req, res, next),

  verifyRefreshToken: (req: Request|any, res: Response, next: NextFunction) =>
    passport.authenticate(
      "jwt-refresh",
      { session: false },
      (err: Error, jwtPayload: JwtPayload, info: { message: string }) => {
        if (!jwtPayload) {
          const { message } = info || {};
          return next(createError(403, message ?? messages.INVALID_TOKEN));
        }

        req.userId = jwtPayload.id;
        req.userRole = jwtPayload.role;
        req.tokenExp = jwtPayload.exp;

        return next();
      },
    )(req, res, next),

  adminOnly: (req: Request|any, res: Response, next: NextFunction) => {
    const { userId, userRole } = req;

    if (userRole !== "admin") {
      logger.error(`user ${userId} attempted to access admin only route`);
      return sendError(res, createError(403, messages.ACCESS_DENIED));
    }

    return next();
  },
  // Middleware to enforce access control
roleAuthorization:(requiredRole: UserAccessLevel) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { userRole, userId } = req as any;  // Assuming `req.user` contains the authenticated admin

    if (userRole === UserAccessLevel.ADMIN || userRole === requiredRole) {
      return next();  // If the admin has the required role or is SuperAdmin, allow access
    } else {
      logger.error(`user ${userId} attempted to access admin only route`);
      return sendError(res, createError(403, messages.ACCESS_DENIED));
    }
  };
}
};