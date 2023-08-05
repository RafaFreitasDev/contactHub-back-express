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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContactService = void 0;
const data_source_1 = require("../../data-source");
const contact_entity_1 = __importDefault(require("../../entities/contact.entity"));
const contact_schema_1 = require("../../schemas/contact.schema");
const user_entity_1 = __importDefault(require("../../entities/user.entity"));
const errors_1 = require("../../errors");
const updateContactService = (userId, contactId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const contactRepository = data_source_1.AppDataSource.getRepository(contact_entity_1.default);
    if (updateData.name) {
        const findContact = yield contactRepository.findOneBy({
            name: updateData.name,
        });
        if (findContact) {
            throw new errors_1.AppError("Name already exists", 409);
        }
    }
    const oldContactData = yield contactRepository.findOneBy({
        id: contactId,
    });
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.default);
    const loggedUser = yield userRepository.findOneBy({ id: userId });
    const newContactData = contactRepository.create(Object.assign(Object.assign({}, oldContactData), updateData));
    yield contactRepository.save(newContactData);
    const newContact = contact_schema_1.contactSchema.parse(newContactData);
    return newContact;
});
exports.updateContactService = updateContactService;
