import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@learn_ticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
