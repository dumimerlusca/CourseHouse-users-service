import {
  HttpException,
  authenticationRequired,
} from "@dumiorg/coursehouse-common";
import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { prisma } from "../prismaClient";

const router = Router();

router.delete(
  "/users/:userId",
  authenticationRequired,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { id: currentUserId } = req.currentUser!;

    if (userId !== currentUserId) {
      throw new HttpException(401, "Unauthorized");
    }

    await prisma.user.delete({ where: { id: userId } });

    res.status(204).send("User deleted successfully");
  })
);

export { router as deleteUserRouter };
