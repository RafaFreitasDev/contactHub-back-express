import { userSchemaPerfil } from "./../schemas/user.schema";
import { z } from "zod";
import {
  userSchema,
  userSchemaList,
  userSchemaRequest,
  userSchemaResponse,
} from "../schemas/user.schema";
import { DeepPartial } from "typeorm";

export type TUser = z.infer<typeof userSchema>;

export type TUserRequest = z.infer<typeof userSchemaRequest>;

export type TUserResponse = z.infer<typeof userSchemaResponse>;

export type TUserList = z.infer<typeof userSchemaList>;

export type TUserUpdate = DeepPartial<TUserRequest>;

export type TUserPerfil = z.infer<typeof userSchemaPerfil>;
