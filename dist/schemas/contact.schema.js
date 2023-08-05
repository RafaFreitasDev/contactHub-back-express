"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactSchemaUpdate = exports.contactSchemaList = exports.contactSchemaRequest = exports.contactSchema = void 0;
const zod_1 = require("zod");
exports.contactSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().max(45),
    email: zod_1.z.string().max(45),
    phone: zod_1.z.string().max(15),
    createdAt: zod_1.z.string().or(zod_1.z.date()),
});
exports.contactSchemaRequest = exports.contactSchema.omit({
    id: true,
    createdAt: true,
});
exports.contactSchemaList = zod_1.z.array(exports.contactSchema);
exports.contactSchemaUpdate = exports.contactSchema
    .omit({ id: true, createdAt: true })
    .partial();
