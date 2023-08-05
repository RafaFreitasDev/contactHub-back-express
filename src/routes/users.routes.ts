import { Router } from "express";
import {
  createUsersController,
  deleteUsersController,
  listUsersController,
  retrieveLoggedUserController,
  updateUserController,
} from "../controllers/users.controllers";
import { ensureBodyIsValid } from "../middlewares/ensureBodyIsValid.middleware";
import { userSchemaRequest, userSchemaUpdate } from "../schemas/user.schema";
import { ensureEmailNotExists } from "../middlewares/ensureEmailNotExists.middleware";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureIdExists } from "../middlewares/ensureIdExists.middleware";
import { ensureIsOwnerAccount } from "../middlewares/ensureIsOwnerAccount.middleware";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureBodyIsValid(userSchemaRequest),
  ensureEmailNotExists,
  createUsersController
);

userRoutes.get("", ensureTokenIsValid, listUsersController);

userRoutes.get("/logged", ensureTokenIsValid, retrieveLoggedUserController);

userRoutes.patch(
  "/:id",
  ensureTokenIsValid,
  ensureIdExists,
  ensureIsOwnerAccount,
  ensureBodyIsValid(userSchemaUpdate),
  ensureEmailNotExists,
  updateUserController
);

userRoutes.delete(
  "/:id",
  ensureTokenIsValid,
  ensureIdExists,
  ensureIsOwnerAccount,
  deleteUsersController
);
