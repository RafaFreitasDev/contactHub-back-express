import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const ensureIsOwnerAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: number = parseInt(req.params.id);
  const logedUserId: number = parseInt(res.locals.userId);

  if (userId !== logedUserId) {
    throw new AppError("Insufficient permission", 403);
  }

  next();
};
