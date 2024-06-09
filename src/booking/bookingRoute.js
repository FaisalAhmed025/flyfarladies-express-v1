
import express from 'express';
import { bookingController } from './bookingcontroller';
const router = express.Router();
router.post("/book/packid/:PKID/userid/:id", bookingController.Book$Hold)
router.get("/book/allbooking", bookingController.getAllBookings)
router.get("/book/single/:bookingid", bookingController.getSingleBookings)
router.get("/book/userid/:userid", bookingController.getuserBookings)
router.get("/book/platform", bookingController.getplatform)
router.get("/packagevisitor", bookingController.getallpackagevisitor)
router.get("/packagevisitor/oneday", bookingController.getonedayvisitor)
router.get("/packagevisitor/sevendays", bookingController.getsevendayvisitor)
router.get("/packagevisitor/thirtydays", bookingController.getsevendayvisitor)
router.post("/approved/:bookingid", bookingController.approvedBooking)
router.post("/packagevisitor", bookingController.packageVisitor)
router.post("/cancelled/:bookingid", bookingController.CancelledBooking)
router.post("/cancelledbyuser/:bookingid", bookingController.CancelledBookingUser)
router.get("/today/booking", bookingController.getBookingbyToday)

export default router;
