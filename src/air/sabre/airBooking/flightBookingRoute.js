import express from "express";
import { flightBookingController } from "./flightBookingController";
const router = express.Router();
router.post(
  "/create-flight-booking",
  flightBookingController.createFlightBooking
);
router.get(
  "/get-all-flight-booking",
  flightBookingController.getBookingHistory
);
router.get(
  "/get-flight-booking-id/:id",
  flightBookingController.getAllBookingController
);
router.delete(
  "/cancel-flight-booking/:id",
  flightBookingController.cancelFlightBooking
);
export const flightBookingRoute = router;
