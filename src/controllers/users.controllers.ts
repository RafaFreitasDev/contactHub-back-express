import { Request, Response } from "express";
import { createUsersService } from "../services/users/createUsers.service";
import {
  TUserList,
  TUserRequest,
  TUserResponse,
  TUserUpdate,
} from "../interfacers/user.interface";
import { listUsersService } from "../services/users/listUsers.service";
import { updateUserService } from "../services/users/updateUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { retrieveLoggedUsersService } from "../services/users/retrieveLoggedUsers.service";

export const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;

  const user = await createUsersService(userData);

  return res.status(201).json(user);
};

export const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: TUserList = await listUsersService();

  return res.status(200).json(users);
};

export const retrieveLoggedUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loggedUserId: number = parseInt(res.locals.userId);

  const user: TUserResponse = await retrieveLoggedUsersService(loggedUserId);

  return res.status(200).json(user);
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  const updateData: TUserUpdate = req.body;
  const logedUserId: number = parseInt(res.locals.userId);

  const updatedUser = await updateUserService(userId, updateData, logedUserId);
  return res.status(200).json(updatedUser);
};

export const deleteUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = parseInt(req.params.id);

  const deleteUser = await deleteUserService(userId);
  return res.status(204).send();
};
