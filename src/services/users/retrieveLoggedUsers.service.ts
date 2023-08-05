import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TUserResponse } from "../../interfacers/user.interface";
import User from "../../entities/user.entity";
import { userSchemaResponse } from "../../schemas/user.schema";

export const retrieveLoggedUsersService = async (
  userLoggedId: number
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: userLoggedId,
    },
    relations: {
      contacts: true,
    },
  });

  const userReturn = userSchemaResponse.parse(user);

  return userReturn;
};
