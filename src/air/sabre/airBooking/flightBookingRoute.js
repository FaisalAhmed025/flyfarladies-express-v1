import express from "express";
import { flightBookingController } from "./flightBookingController";
import verifyToken from "../../../user/service";
import { upload } from "../../../tourpackage/imageUpload.midleware";
import {
  handlePassportVisa,
  storeMultipleImage,
} from "../../../tourpackage/imageHandler";
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

router.put(
  "/issue-ticket/:id",
  verifyToken,
  flightBookingController.IssueTicket
);
router
  .route("/upload-passport-visa/:id")
  .post(
    verifyToken,
    upload.fields([{ name: "passportCopy" }, { name: "visaCopy" }]),
    handlePassportVisa,
    storeMultipleImage,
    flightBookingController.uploadPassportAndVisaController
  );

export const flightBookingRoute = router;
