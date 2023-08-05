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
exports.ensureIsObjectOwner = void 0;
const errors_1 = require("../errors");
const contact_entity_1 = __importDefault(require("../entities/contact.entity"));
const data_source_1 = require("../data-source");
const ensureIsObjectOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(res.locals.userId);
    const contactId = parseInt(req.params.id);
    const contactRepository = data_source_1.AppDataSource.getRepository(contact_entity_1.default);
    const contact = yield contactRepository.findOne({
        where: {
            id: contactId,
        },
        relations: {
            user: true,
        },
    });
    if (!contact) {
        throw new errors_1.AppError("Contact not found", 404);
    }
    if (contact.user.id != userId) {
        throw new errors_1.AppError("This contact is not yours", 403);
    }
    next();
});
exports.ensureIsObjectOwner = ensureIsObjectOwner;
