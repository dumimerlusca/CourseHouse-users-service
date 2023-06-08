import { config } from "dotenv";
config();

import { app } from "./app";

startServer();

function startServer() {
  checkEnv();

  app.listen(process.env.PORT, () => {
    console.log(`Users service listening on port ${process.env.PORT}`);
  });
}

function checkEnv() {
  if (!process.env.PORT) {
    throw new Error("PORT missing!");
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET missing!");
  }
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL missing!");
  }
}
