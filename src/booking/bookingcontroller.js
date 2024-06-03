import { BookingService } from "./bookingservice";

const Book$Hold  = async (req, res) => {
  await BookingService.Book$Hold(req,res);

}


const getAllBookings  = async (req, res) => {
  const book = await BookingService.getAllBooking(req,res);
 return res.json({
  bookings:book
  })
}

const getSingleBookings  = async (req, res) => {
  const book = await BookingService.getSingleBooking(req,res);
 return res.json({
  booking:book
  })
}


const approvedBooking = async (req, res) => {
   await BookingService.ApprovedBooking(req,res);
}


const getplatform = async (req, res) => {
  await BookingService.getplatform(req,res);
}


const CancelledBooking = async (req, res) => {
  await BookingService.CancelledBooking(req,res);

}

const CancelledBookingUser = async (req, res) => {
  await BookingService.CancelledBookingByuser(req,res);

}


const getuserBookings  = async (req, res) => {
   await BookingService.getBookingsByUserId(req,res);
}



export const bookingController = {
  Book$Hold,
  getAllBookings,
  getplatform,
  getSingleBookings,
  getuserBookings,
  approvedBooking,
  CancelledBooking,
  CancelledBookingUser
}