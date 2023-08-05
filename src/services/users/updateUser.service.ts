import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TUserResponse, TUserUpdate } from "../../interfacers/user.interface";
import { AppError } from "../../errors";
import User from "../../entities/user.entity";
import { userSchemaResponse } from "../../schemas/user.schema";

export const updateUserService = async (
  userId: number,
  updateData: TUserUpdate,
  logedUserId: number
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData: User | null = await userRepository.findOneBy({
    id: userId,
  });

  if (!oldUserData) {
    throw new AppError("User not found", 404);
  }

  const newUserData: User = userRepository.create({
    ...oldUserData,
    ...updateData,
  });

  await userRepository.save(newUserData);

  const newUser: TUserResponse = userSchemaResponse.parse(newUserData);

  return newUser;
};
