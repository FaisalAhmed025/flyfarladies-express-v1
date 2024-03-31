import express from "express";
import { flightBookingController } from "./flightBookingController";
import verifyToken from "../../../user/service";
const router = express.Router();
router.post(
  "/create-flight-booking",
  verifyToken,
  flightBookingController.createFlightBooking
);
router.get(
  "/get-all-flight-booking",
  verifyToken,
  flightBookingController.getBookingHistory
);
router.get(
  "/get-flight-booking-id/:id",
  verifyToken,
  flightBookingController.getAllBookingController
);
router.delete(
  "/cancel-flight-booking/:id",
  verifyToken,
  flightBookingController.cancelFlightBooking
);

router.post("/issue-ticket", verifyToken, flightBookingController.IssueTicket);

export const flightBookingRoute = router;
