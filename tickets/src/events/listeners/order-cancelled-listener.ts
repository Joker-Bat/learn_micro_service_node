import {
  Listener,
  OrderCancelledEvent,
  Subjects,
} from "@learn_ticketing/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { queueGroupName } from "./queue-group-name";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    // Find the ticket that the order is cancelled
    const ticket = await Ticket.findById(data.ticket.id);

    // If not ticket throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    // Make the ticket as undefined for the order that cancelled now
    ticket.set({ orderId: undefined });
    await ticket.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      orderId: ticket.orderId,
      title: ticket.title,
      userId: ticket.userId,
      price: ticket.price,
      version: ticket.version,
    });

    msg.ack();
  }
}
