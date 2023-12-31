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
exports.loginSessionController = void 0;
const login_service_1 = require("../services/login/login.service");
const loginSessionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = req.body;
    const token = yield (0, login_service_1.loginSessionService)(loginData);
    return res.status(200).json({ token });
});
exports.loginSessionController = loginSessionController;
