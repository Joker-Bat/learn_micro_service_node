import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import {
  NotFoundError,
  errorHandler,
  currentUser,
} from "@learn_ticketing/common";
import {
  allTicketsRouter,
  createTicketRouter,
  showTicketRouter,
  updateTicketRouter,
} from "./routes";

const app = express();
app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);
app.use(showTicketRouter);
app.use(allTicketsRouter);
app.use(updateTicketRouter);

app.use(createTicketRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
