
import express from 'express';
import { bookingController } from './bookingcontroller';
const router = express.Router();

router.post("/book/packid/:PkID/userid/:id", bookingController.Book$Hold)
router.get("/book/allbooking", bookingController.getAllBookings)
router.get("/book/single/:bookingid", bookingController.getSingleBookings)
router.get("/book/userid/:userid", bookingController.getuserBookings)


export default router;
