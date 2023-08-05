"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactController = exports.updateContactController = exports.retrieveContactController = exports.listContactsController = exports.createContactController = void 0;
const createContact_service_1 = require("../services/contacts/createContact.service");
const listContacts_service_1 = require("../services/contacts/listContacts.service");
const retrieveContact_service_1 = require("../services/contacts/retrieveContact.service");
const updateContact_service_1 = require("../services/contacts/updateContact.service");
const deleteContact_service_1 = require("../services/contacts/deleteContact.service");
const createContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contactData = req.body;
    const userId = parseInt(res.locals.userId);
    const contact = yield (0, createContact_service_1.createContactService)(contactData, userId);
    return res.status(201).json(contact);
});
exports.createContactController = createContactController;
const listContactsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(res.locals.userId);
    const contacts = yield (0, listContacts_service_1.listContactsService)(userId);
    return res.status(200).json(contacts);
});
exports.listContactsController = listContactsController;
const retrieveContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(res.locals.userId);
    const contactId = parseInt(req.params.id);
    const contact = yield (0, retrieveContact_service_1.retrieveContactsService)(userId, contactId);
    return res.status(200).json(contact);
});
exports.retrieveContactController = retrieveContactController;
const updateContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(res.locals.userId);
    const contactId = parseInt(req.params.id);
    const updateData = req.body;
    const updatedContact = yield (0, updateContact_service_1.updateContactService)(userId, contactId, updateData);
    return res.status(200).json(updatedContact);
});
exports.updateContactController = updateContactController;
const deleteContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contactId = parseInt(req.params.id);
    const deleteContact = yield (0, deleteContact_service_1.deleteContactService)(contactId);
    return res.status(204).send();
});
exports.deleteContactController = deleteContactController;
