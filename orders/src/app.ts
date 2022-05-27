import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import {
  NotFoundError,
  errorHandler,
  currentUser,
} from "@learn_ticketing/common";
import {
  allOrdersRouter,
  newOrderRouter,
  showOrderRouter,
  deleteOrderRouter,
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

app.use(allOrdersRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(deleteOrderRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
