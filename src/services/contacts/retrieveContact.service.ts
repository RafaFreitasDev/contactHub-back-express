import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TContactResponse } from "../../interfacers/contact.interface";
import Contact from "../../entities/contact.entity";
import { contactSchema } from "../../schemas/contact.schema";
import User from "../../entities/user.entity";
import { AppError } from "../../errors";

export const retrieveContactsService = async (
  userId: number,
  contactId: number
): Promise<TContactResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const contactsRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contact = await contactsRepository
    .createQueryBuilder("contact")
    .where("contact.user = :userId", { userId: user.id })
    .andWhere("contact.id = :contactId", { contactId })
    .getOne();

  if (!contact) {
    throw new AppError("Contact not found", 404);
  }

  const contactReturn = contactSchema.parse(contact);

  return contactReturn;
};
