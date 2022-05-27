import request from "supertest";
import { app } from "../../app";

it("fail when signin with unknown email", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "1234" })
    .expect(400);
});

it("Fails on incorrect password", async () => {
  const createResponse = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "1234" })
    .expect(201);

  expect(createResponse.get("Set-Cookie")).toBeDefined();

  const signInResponse = await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "1243" })
    .expect(400);
});

it("Respond with cookie for valid credentials", async () => {
  const createResponse = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "1234" })
    .expect(201);

  expect(createResponse.get("Set-Cookie")).toBeDefined();

  const signInResponse = await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "1234" })
    .expect(200);

  expect(signInResponse.get("Set-Cookie")).toBeDefined();
});
