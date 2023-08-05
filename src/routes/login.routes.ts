import { Router } from "express";
import { loginSessionController } from "../controllers/login.controllers";

export const loginRoutes: Router = Router();

loginRoutes.post("", loginSessionController);
