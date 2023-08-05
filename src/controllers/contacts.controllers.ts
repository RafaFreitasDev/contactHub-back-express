import { Request, Response } from "express";
import {
  TContactList,
  TContactRequest,
  TContactResponse,
  TContactUpdate,
} from "../interfacers/contact.interface";
import { createContactService } from "../services/contacts/createContact.service";
import { listContactsService } from "../services/contacts/listContacts.service";
import { retrieveContactsService } from "../services/contacts/retrieveContact.service";
import { updateContactService } from "../services/contacts/updateContact.service";
import { deleteContactService } from "../services/contacts/deleteContact.service";

export const createContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contactData: TContactRequest = req.body;
  const userId: number = parseInt(res.locals.userId);

  const contact = await createContactService(contactData, userId);

  return res.status(201).json(contact);
};

export const listContactsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(res.locals.userId);
  const contacts: TContactList = await listContactsService(userId);

  return res.status(200).json(contacts);
};

export const retrieveContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(res.locals.userId);
  const contactId: number = parseInt(req.params.id);

  const contact: TContactResponse = await retrieveContactsService(
    userId,
    contactId
  );

  return res.status(200).json(contact);
};

export const updateContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(res.locals.userId);
  const contactId: number = parseInt(req.params.id);
  const updateData: TContactUpdate = req.body;

  const updatedContact = await updateContactService(
    userId,
    contactId,
    updateData
  );
  return res.status(200).json(updatedContact);
};

export const deleteContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contactId: number = parseInt(req.params.id);

  const deleteContact = await deleteContactService(contactId);

  return res.status(204).send();
};
