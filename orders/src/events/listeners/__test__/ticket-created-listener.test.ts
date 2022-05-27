import { TicketCreatedEvent } from "@learn_ticketing/common";
import { TicketCreatedListener } from "../ticket-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
  // Create the instance of the listener
  const listener = new TicketCreatedListener(natsWrapper.client);

  // Create a fake data event
  const data: TicketCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 24,
    title: "concert",
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
  };

  // Create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("Creates and saves a ticket", async () => {
  const { listener, data, msg } = await setup();

  // Call the onMessage method with fake data + message object
  await listener.onMessage(data, msg);

  // Write assertion to make sure a ticket was created
  const ticket = await Ticket.findById(data.id);

  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
  expect(ticket!.price).toEqual(data.price);
});

it("Acks the message", async () => {
  const { listener, data, msg } = await setup();

  // Call the onMessage method with fake data + message object
  await listener.onMessage(data, msg);

  // Write assertion to make sure ack funtion is called
  expect(msg.ack).toHaveBeenCalled();
});
