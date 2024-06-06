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

const getallpackagevisitor  = async (req, res) => {
  const vistor = await BookingService.getpackagevisitor(req,res);
 return res.json({
  visitors:vistor
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


const packageVisitor = async (req, res) => {
  await BookingService.packageVisitor(req,res);
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

const getonedayvisitor  = async (req, res) => {
  await BookingService.getPackageVisitorLast1Day(req,res);
}

const getsevendayvisitor  = async (req, res) => {
  await BookingService.getPackageVisitorLast7Days(req,res);
}

const get30dayvisitor  = async (req, res) => {
  await BookingService.get30dayvisitor(req,res);
}






export const bookingController = {
  Book$Hold,
  getAllBookings,
  getplatform,
  getonedayvisitor,
  getsevendayvisitor,
  get30dayvisitor,
  getSingleBookings,
  getuserBookings,
  approvedBooking,
  CancelledBooking,
  CancelledBookingUser,
  packageVisitor,
  getallpackagevisitor
}