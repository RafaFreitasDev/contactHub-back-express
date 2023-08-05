import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TUserList } from "../../interfacers/user.interface";
import User from "../../entities/user.entity";
import { userSchemaList } from "../../schemas/user.schema";

export const listUsersService = async (): Promise<TUserList> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const users: User[] = await userRepository.find({
    relations: {
      contacts: true,
    },
  });

  const usersReturn = userSchemaList.parse(users);

  return usersReturn;
};
