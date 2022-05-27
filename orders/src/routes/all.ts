import express, { Response, Request } from "express";
import { requireAuth } from "@learn_ticketing/common";
import { Order } from "../models/order";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const userId = req.currentUser!.id;
  const orders = await Order.find({ userId }).populate("ticket");

  res.status(200).json(orders);
});

export { router as allOrdersRouter };
