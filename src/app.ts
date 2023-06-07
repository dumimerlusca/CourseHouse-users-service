import { config } from "dotenv";
config();

import { errorMiddleware } from "@dumiorg/coursehouse-common";
import cors from "cors";
import express, { json } from "express";
import { deleteUserRouter } from "./routes/delete-user";
import { updateUserRouter } from "./routes/update-user";

const app = express();

app.use(cors());
app.use(json());

app.use(deleteUserRouter);
app.use(updateUserRouter);

app.use(errorMiddleware);

export { app };
