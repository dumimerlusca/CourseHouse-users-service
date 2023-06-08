import request from "supertest";
import { app } from "../../app";
import { prisma } from "../../prismaClient";

it("should throw an error if current loged in user is trying to update another user", async () => {
  // Login as a different user
  const bearerToken = global.getAuthHeader("asdasdnasdadsad");

  return request(app)
    .patch(`/users/sudfsfnsdufsbfsd`)
    .set("authorization", bearerToken)
    .send({})
    .expect(401);
});

it("shoud update the user successfully", async () => {
  const user = await prisma.user.create({
    data: { email: "test@test.com", password: "123456", name: "Test" },
  });
  const bearerToken = global.getAuthHeader(user.id);

  const newName = "New Name";

  await request(app)
    .patch(`/users/${user.id}`)
    .set("authorization", bearerToken)
    .send({ name: newName })
    .expect(200);

  const updatedUser = await prisma.user.findFirst({ where: { id: user.id } });

  expect(updatedUser?.name).toEqual(newName);
});
