import { Repository } from "typeorm";
import { AppError } from "../../errors";
import { AppDataSource } from "../../data-source";
import { compare } from "bcryptjs";
import jwd from "jsonwebtoken";
import "dotenv/config";
import { TLongin } from "../../interfacers/login.interfaces";
import User from "../../entities/user.entity";

export const loginSessionService = async (
  loginData: TLongin
): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    email: loginData.email,
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatch = await compare(loginData.password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwd.sign(
    { email: user.email },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "1w",
      subject: String(user.id),
    }
  );

  return token;
};
