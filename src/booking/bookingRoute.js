
import express from 'express';
import { bookingController } from './bookingcontroller';
const router = express.Router();
router.post("/book/packid/:PKID/userid/:id", bookingController.Book$Hold)
router.get("/book/allbooking", bookingController.getAllBookings)
router.get("/book/single/:bookingid", bookingController.getSingleBookings)
router.get("/book/userid/:userid", bookingController.getuserBookings)
router.post("/approved/:bookingid", bookingController.approvedBooking)
router.post("/cancelled/:bookingid", bookingController.CancelledBooking)

export default router;
