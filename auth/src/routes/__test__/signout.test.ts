import request from "supertest";
import { app } from "../../app";

it("clears the cookie after signout", async () => {
  const signUpResponse = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "1234" })
    .expect(201);

  expect(signUpResponse.get("Set-Cookie")).toBeDefined();

  const signOutResponse = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  expect(signOutResponse.get("Set-Cookie")).toBeDefined();
});
