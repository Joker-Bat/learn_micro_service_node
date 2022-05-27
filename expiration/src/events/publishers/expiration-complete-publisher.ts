import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@learn_ticketing/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
