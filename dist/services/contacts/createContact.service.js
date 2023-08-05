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
exports.createContactService = void 0;
const user_entity_1 = __importDefault(require("../../entities/user.entity"));
const data_source_1 = require("../../data-source");
const errors_1 = require("../../errors");
const contact_entity_1 = __importDefault(require("../../entities/contact.entity"));
const contact_schema_1 = require("../../schemas/contact.schema");
const createContactService = (contactData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const name = contactData.name;
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.default);
    const user = yield userRepository.findOneBy({ id: userId });
    if (!user) {
        throw new errors_1.AppError("User not found", 404);
    }
    const contactsRepository = data_source_1.AppDataSource.getRepository(contact_entity_1.default);
    const contact = contactsRepository.create(Object.assign(Object.assign({}, contactData), { user }));
    yield contactsRepository.save(contact);
    const contactReturn = contact_schema_1.contactSchema.parse(contact);
    return contactReturn;
});
exports.createContactService = createContactService;
