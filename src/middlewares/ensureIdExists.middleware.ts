import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import User from "../entities/user.entity";
import { TUser } from "../interfacers/user.interface";
import { AppError } from "../errors";

export const ensureIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: number = parseInt(req.params.id);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: TUser | null = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  } else {
    return next();
  }
};
