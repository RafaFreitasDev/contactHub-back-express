import "reflect-metadata";
import "express-async-errors";
import express, { Application, json } from "express";
import { userRoutes } from "./routes/users.routes";
import { handleErrors } from "./errors";
import { loginRoutes } from "./routes/login.routes";
import { contactsRoutes } from "./routes/contacts.routes";
import cors from "cors"

const app: Application = express();

app.use(json());
app.use(cors({
    origin: ["http://localhost:5173","https://m6-sprint2-front.vercel.app"]
}))

app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/contacts", contactsRoutes);

app.use(handleErrors);

export default app;
