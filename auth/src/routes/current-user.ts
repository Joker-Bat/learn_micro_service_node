import { Router } from "express";
import { currentUser } from "@learn_ticketing/common";

const router = Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  return res.status(200).json({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
