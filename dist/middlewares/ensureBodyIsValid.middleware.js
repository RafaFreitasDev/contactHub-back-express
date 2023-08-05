"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureBodyIsValid = void 0;
const ensureBodyIsValid = (schema) => (req, res, next) => {
    const validatedBody = schema.parse(req.body);
    req.body = validatedBody;
    return next();
};
exports.ensureBodyIsValid = ensureBodyIsValid;
