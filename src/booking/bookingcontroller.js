import { BookingService } from "./bookingservice";

const Book$Hold  = async (req, res) => {
  const book = await BookingService.Book$Hold(req,res);
 return res.json({
    data:book
  })
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




export const bookingController = {
  Book$Hold,
  getAllBookings,
  getSingleBookings
}