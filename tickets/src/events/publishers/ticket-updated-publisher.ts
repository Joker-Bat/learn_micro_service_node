import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@learn_ticketing/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
