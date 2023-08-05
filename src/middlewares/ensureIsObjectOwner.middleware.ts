import { log } from "console";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { Repository } from "typeorm";
import Contact from "../entities/contact.entity";
import { AppDataSource } from "../data-source";

export const ensureIsObjectOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: number = parseInt(res.locals.userId);
  const contactId: number = parseInt(req.params.id);

  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOne({
    where: {
      id: contactId,
    },
    relations: {
      user: true,
    },
  });

  if (!contact) {
    throw new AppError("Contact not found", 404);
  }

  if (contact.user.id != userId) {
    throw new AppError("This contact is not yours", 403);
  }

  next();
};
