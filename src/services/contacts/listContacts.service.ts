import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TContactList } from "../../interfacers/contact.interface";
import Contact from "../../entities/contact.entity";
import { contactSchemaList } from "../../schemas/contact.schema";
import User from "../../entities/user.entity";
import { AppError } from "../../errors";

export const listContactsService = async (
  userId: number
): Promise<TContactList> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const contactsRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contacts = await contactsRepository
    .createQueryBuilder("contact")
    .where("contact.user = :userId", { userId: user.id })
    .orderBy("contact.name", "ASC")
    .getMany();

  const contactsReturn = contactSchemaList.parse(contacts);

  return contactsReturn;
};
