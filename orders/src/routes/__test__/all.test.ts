import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import mongoose from "mongoose";

const buildTicket = async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 24,
  });
  await ticket.save();

  return ticket;
};

it("Fetch orders for an particular user", async () => {
  // Create three tickets
  const ticket1 = await buildTicket();
  const ticket2 = await buildTicket();
  const ticket3 = await buildTicket();

  const userOne = global.signin();
  const userTwo = global.signin();
  // Create one order as user#1
  await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticketId: ticket1.id })
    .expect(201);

  // Create Two order as user#2
  const { body: orderOneBody } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticket2.id })
    .expect(201);

  const { body: orderTwoBody } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticket3.id })
    .expect(201);

  // Make request to get all orders of user#2
  const response = await request(app)
    .get("/api/orders")
    .set("Cookie", userTwo)
    .expect(200);

  // Make sure we got orders for user#2 only and not user#1
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(orderOneBody.id);
  expect(response.body[1].id).toEqual(orderTwoBody.id);
  expect(response.body[0].ticket.id).toEqual(ticket2.id);
  expect(response.body[1].ticket.id).toEqual(ticket3.id);
});
