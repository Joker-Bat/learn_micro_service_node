import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from "@learn_ticketing/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
