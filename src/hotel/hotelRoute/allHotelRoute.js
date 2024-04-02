import express from "express";
import { hotelBookingDataController } from "../hotelBooking/hotelBookingController";
import verifyToken from "../../user/service";
import { hotelPreBookRoute } from "./preeBookRoute";
import { upload } from "../../tourpackage/imageUpload.midleware";
import { imageHandlerUpdate } from "../../tourpackage/imageHandler";
import { hotelPaymentController } from "../hotelPayment/hotelPaymentController";
const router = express.Router();
router.post("/price-check", hotelPreBookRoute);
router.post(
  "/hotel-booking-create",
  verifyToken,
  hotelBookingDataController.createHotelBooking
);
router.get(
  "/get-all-hotel-booking",
  verifyToken,
  hotelBookingDataController.getAllBookingInfo
);
router.get(
  "/get-single-hotel-booking/:id",
  verifyToken,
  hotelBookingDataController.getSingleBooking
);
router.put(
  "/upload-image/:id",
  upload.single("images"),
  imageHandlerUpdate,
  verifyToken,
  hotelBookingDataController.uploadNidImage
);
router.put(
  "/cancel-hotel-booking/:id",
  verifyToken,
  hotelBookingDataController.uploadNidImage
);
router.post(
  "/hotel-payment/:id",
  verifyToken,
  hotelPaymentController.hotelPayment
);
export const hotelRoute = router;
