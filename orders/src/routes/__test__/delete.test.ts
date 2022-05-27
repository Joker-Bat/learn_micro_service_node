import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { OrderStatus } from "@learn_ticketing/common";
import { natsWrapper } from "../../nats-wrapper";
import mongoose from "mongoose";

it("Make an order as cancelled", async () => {
  // Create a ticket
  const ticket = await Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 24,
  });

  await ticket.save();

  const user = global.signin();
  // Create an order with that ticket
  const { body: orderBody } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Cancel that order and check if its success
  await request(app)
    .delete(`/api/orders/${orderBody.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  const { body: updatedOrder } = await request(app)
    .get(`/api/orders/${orderBody.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(updatedOrder.status).toEqual(OrderStatus.Cancelled);
});

it("Emits an order cancelled event", async () => {
  // Create a ticket
  const ticket = await Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 24,
  });

  await ticket.save();

  const user = global.signin();
  // Create an order with that ticket
  const { body: orderBody } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Cancel that order and check if its success
  await request(app)
    .delete(`/api/orders/${orderBody.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
