import request from "supertest";
import { app } from "../../app";
import { prisma } from "../../prismaClient";

it("should throw an error if current loged in user is trying to delete another user", async () => {
  // Login as a different user
  const bearerToken = global.getAuthHeader("asdasdnasdadsad");

  return request(app)
    .delete(`/users/sudfsfnsdufsbfsd`)
    .set("authorization", bearerToken)
    .expect(401);
});

it("should delete the user from the databse", async () => {
  const user = await prisma.user.create({
    data: { email: "test@test.com", password: "123456", name: "Test" },
  });
  const bearerToken = global.getAuthHeader(user.id);

  await request(app)
    .delete(`/users/${user.id}`)
    .set("authorization", bearerToken)
    .expect(204);

  const deletedUser = await prisma.user.findFirst({ where: { id: user.id } });

  expect(deletedUser).toBeNull();
});
