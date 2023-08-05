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
exports.deleteUsersController = exports.updateUserController = exports.retrieveLoggedUserController = exports.listUsersController = exports.createUsersController = void 0;
const createUsers_service_1 = require("../services/users/createUsers.service");
const listUsers_service_1 = require("../services/users/listUsers.service");
const updateUser_service_1 = require("../services/users/updateUser.service");
const deleteUser_service_1 = require("../services/users/deleteUser.service");
const retrieveLoggedUsers_service_1 = require("../services/users/retrieveLoggedUsers.service");
const createUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const user = yield (0, createUsers_service_1.createUsersService)(userData);
    return res.status(201).json(user);
});
exports.createUsersController = createUsersController;
const listUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, listUsers_service_1.listUsersService)();
    return res.status(200).json(users);
});
exports.listUsersController = listUsersController;
const retrieveLoggedUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loggedUserId = parseInt(res.locals.userId);
    const user = yield (0, retrieveLoggedUsers_service_1.retrieveLoggedUsersService)(loggedUserId);
    return res.status(200).json(user);
});
exports.retrieveLoggedUserController = retrieveLoggedUserController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    const updateData = req.body;
    const logedUserId = parseInt(res.locals.userId);
    const updatedUser = yield (0, updateUser_service_1.updateUserService)(userId, updateData, logedUserId);
    return res.status(200).json(updatedUser);
});
exports.updateUserController = updateUserController;
const deleteUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    const deleteUser = yield (0, deleteUser_service_1.deleteUserService)(userId);
    return res.status(204).send();
});
exports.deleteUsersController = deleteUsersController;
