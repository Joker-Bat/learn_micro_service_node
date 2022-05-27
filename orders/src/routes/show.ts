import express, { Response, Request } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@learn_ticketing/common";
import { Order } from "../models/order";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const userId = req.currentUser!.id;
    const order = await Order.findById(req.params.orderId).populate("ticket");

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== userId) {
      throw new NotAuthorizedError();
    }

    res.status(200).json(order);
  }
);

export { router as showOrderRouter };
