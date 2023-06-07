import {
  HttpException,
  authenticationRequired,
} from "@dumiorg/coursehouse-common";
import { Request, Response, Router } from "express";
import asyncHandlder from "express-async-handler";
import { prisma } from "../prismaClient";

const router = Router();

router.patch(
  "/users/:userId",
  authenticationRequired,
  asyncHandlder(async (req: Request, res: Response) => {
    const { id: currentUserId } = req.currentUser!;
    const { userId } = req.params;

    if (currentUserId !== userId) {
      throw new HttpException(401, "Unauthorized");
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUserId },
      data: { ...req.body },
    });

    res.send(updatedUser);
  })
);

export { router as updateUserRouter };
