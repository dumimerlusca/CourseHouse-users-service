import { authenticationRequired } from "@dumiorg/coursehouse-common";
import { Router } from "express";

const router = Router();

router.delete("/users/:userId", authenticationRequired, (req, res) => {
  const { userId } = req.params;

  res.send("Delete user");
});

export { router as deleteUserRouter };
