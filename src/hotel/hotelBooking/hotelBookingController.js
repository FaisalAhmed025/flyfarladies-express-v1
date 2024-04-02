import {
  getBookingInfo,
  getSingleBookingInfo,
  insertMultipleHotelBookings,
  updateBookingStatusToCancelled,
  uploadNidCopy,
} from "./hotelBookingService";

const createHotelBooking = async (req, res) => {
  try {
    const bookings = req.body;
    // Call the service function to insert the agent hotel booking
    const result = await insertMultipleHotelBookings(bookings, req);

    // Send a success response with the inserted data
    res.status(200).json({
      success: true,
      message: "Agent hotel booking created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: error.message,
    });
  }
};
const getAllBookingInfo = async (req, res) => {
  try {
    const result = await getBookingInfo(req, res);
    res.status(200).json({
      success: true,
      message: "Hotel Booking retrieve successfully",
      data: result || "",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Some thing went wrong",
    });
  }
};
const getSingleBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const result = await getSingleBookingInfo(req, bookingId);
    res.status(200).json({
      success: true,
      message: "Hotel Booking retrieve successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some thing went wrong",
    });
  }
};
const uploadNidImage = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const result = await uploadNidCopy(req, bookingId);
    res.status(200).json({
      success: true,
      message: "Nid Image uploaded successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some thing went wrong",
    });
  }
};
const cancelHotelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const result = await updateBookingStatusToCancelled(req, bookingId);
    res.status(200).json({
      success: true,
      message: "Hotel booking cancelled successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some thing went wrong",
    });
  }
};
export const hotelBookingDataController = {
  createHotelBooking,
  getAllBookingInfo,
  getSingleBooking,
  uploadNidImage,
  cancelHotelBooking,
};
