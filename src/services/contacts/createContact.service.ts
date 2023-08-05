import { Repository } from "typeorm";
import User from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import Contact from "../../entities/contact.entity";
import {
  TContact,
  TContactRequest,
  TContactResponse,
} from "../../interfacers/contact.interface";
import { contactSchema } from "../../schemas/contact.schema";

export const createContactService = async (
  contactData: TContactRequest,
  userId: number
): Promise<TContactResponse> => {
  const name = contactData.name;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const contactsRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contact: TContact = contactsRepository.create({
    ...contactData,
    user,
  });

  await contactsRepository.save(contact);

  const contactReturn: TContactResponse = contactSchema.parse(contact);

  return contactReturn;
};
