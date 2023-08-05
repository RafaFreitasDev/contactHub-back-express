import { Repository } from "typeorm";
import { TUserRequest, TUserResponse } from "../../interfacers/user.interface";
import User from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { userSchemaResponse } from "../../schemas/user.schema";
import { AppError } from "../../errors";

export const createUsersService = async (
  userData: TUserRequest
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRepository.create(userData);
  await userRepository.save(user);

  const newUser: TUserResponse = userSchemaResponse.parse(user);

  return newUser;
};
