import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import Contact from "../../entities/contact.entity";

export const deleteContactService = async (
  contactId: number
): Promise<void> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOneBy({ id: contactId });

  if (!contact) {
    throw new AppError("User not found", 404);
  }

  await contactRepository.remove(contact);
};
