import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "1234",
    })
    .expect(201);
});

it("returns 400 with an invalid email", async () => {
  return await request(app)
    .post("/api/users/signup")
    .send({
      email: "test",
      password: "1234",
    })
    .expect(400);
});

it("returns 400 with an invalid password", async () => {
  return await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "12",
    })
    .expect(400);
});

it("returns 400 with missing email and/or password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com" })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({ password: "1234" })
    .expect(400);
});

it("disallows dublicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "1234" })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "1234" })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "1234" })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
