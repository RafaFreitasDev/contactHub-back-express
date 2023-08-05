import { ensureTokenIsValid } from "./../middlewares/ensureTokenIsValid.middleware";
import { Router } from "express";
import { ensureBodyIsValid } from "../middlewares/ensureBodyIsValid.middleware";
import { contactSchemaRequest } from "../schemas/contact.schema";
import {
  createContactController,
  deleteContactController,
  listContactsController,
  retrieveContactController,
  updateContactController,
} from "../controllers/contacts.controllers";
import { ensureIsObjectOwner } from "../middlewares/ensureIsObjectOwner.middleware";

export const contactsRoutes: Router = Router();

contactsRoutes.post(
  "",
  ensureTokenIsValid,
  ensureBodyIsValid(contactSchemaRequest),
  createContactController
);

contactsRoutes.get("", ensureTokenIsValid, listContactsController);

contactsRoutes.get("/:id", ensureTokenIsValid, retrieveContactController);

contactsRoutes.patch(
  "/:id",
  ensureTokenIsValid,
  ensureIsObjectOwner,
  updateContactController
);

contactsRoutes.delete(
  "/:id",
  ensureTokenIsValid,
  ensureIsObjectOwner,
  deleteContactController
);
