"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemaList = exports.userSchemaPerfil = exports.userSchemaUpdate = exports.userSchemaResponse = exports.userSchemaRequest = exports.userSchema = void 0;
const zod_1 = require("zod");
const contact_schema_1 = require("./contact.schema");
exports.userSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().max(45),
    email: zod_1.z.string().max(45).email(),
    phone: zod_1.z.string().max(15),
    password: zod_1.z.string().max(120),
    createdAt: zod_1.z.string().or(zod_1.z.date()),
});
exports.userSchemaRequest = exports.userSchema.omit({
    id: true,
    createdAt: true,
});
exports.userSchemaResponse = exports.userSchema.omit({
    password: true,
});
exports.userSchemaUpdate = exports.userSchema
    .omit({ id: true, createdAt: true })
    .partial();
exports.userSchemaPerfil = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().max(45),
    email: zod_1.z.string().max(45).email(),
    phone: zod_1.z.string().max(15),
    createdAt: zod_1.z.string().or(zod_1.z.date()),
    contacts: zod_1.z.array(contact_schema_1.contactSchema),
});
exports.userSchemaList = zod_1.z.array(exports.userSchemaResponse);
