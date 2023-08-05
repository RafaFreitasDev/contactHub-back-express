import { z } from "zod";
import {
  contactSchema,
  contactSchemaList,
  contactSchemaRequest,
} from "../schemas/contact.schema";
import { DeepPartial } from "typeorm";

export type TContact = z.infer<typeof contactSchema>;

export type TContactRequest = z.infer<typeof contactSchemaRequest>;

export type TContactResponse = z.infer<typeof contactSchema>;

export type TContactList = z.infer<typeof contactSchemaList>;

export type TContactUpdate = DeepPartial<TContactRequest>;
