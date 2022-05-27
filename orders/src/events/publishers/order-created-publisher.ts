import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@learn_ticketing/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
