import { config } from "dotenv";
config();

import { app } from "./app";

startServer();

function startServer() {
  checkEnv();

  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
}

function checkEnv() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET missing!");
  }
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL missing!");
  }
}
