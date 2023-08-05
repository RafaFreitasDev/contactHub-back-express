import { Request, Response } from "express";
import { TLongin } from "../interfacers/login.interfaces";
import { loginSessionService } from "../services/login/login.service";

export const loginSessionController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginData: TLongin = req.body;

  const token = await loginSessionService(loginData);

  return res.status(200).json({ token });
};
