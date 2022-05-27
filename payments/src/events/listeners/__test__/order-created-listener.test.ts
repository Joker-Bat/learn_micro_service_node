import { OrderCreatedEvent, OrderStatus } from "@learn_ticketing/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Order } from "../../../models/order";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";

const setup = () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    expiresAt: "123",
    userId: "123",
    status: OrderStatus.Created,
    ticket: {
      id: "123",
      price: 24,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("Replicates order info", async () => {
  const { listener, data, msg } = setup();
  await listener.onMessage(data, msg);

  const order = await Order.findById(data.id);
  expect(order!.price).toEqual(data.ticket.price);
});

it("Acks the message", async () => {
  const { listener, data, msg } = setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
