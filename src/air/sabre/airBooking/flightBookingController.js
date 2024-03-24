import httpStatus from "http-status";
import { flightBookingService } from "./flightBookingService";

const createFlightBooking = async (req, res, next) => {
  try {
    const result = await flightBookingService.createBooking(req, res, next);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getBookingHistory = async (req, res) => {
  try {
    const result = await flightBookingService.getBookingHistory(req, res);
    res.status(httpStatus.OK).json({
      status: "success",
      message: "Booking history retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
  }
};
const cancelFlightBooking = async (req, res, next) => {
  try {
    const result = await flightBookingService.cancelBooking(req, res, next);

    res.status(httpStatus.OK).json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    res.status(httpStatus.CONFLICT).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllBookingController = async (req, res, next) => {
  try {
    const id = req.params.id;
    // Call the getAllBookingData function with the provided user_id and booking_id
    const result = await flightBookingService.getAllBookingData(req, id);
    console.log(result);
    // Check if the result is not null (i.e., data found)
    if (result) {
      res.status(200).json({
        success: true,
        message: "Data retrieve successfully",
        data: result,
      });
    } else {
      // If no data found, send a 404 Not Found response
      res.status(404).json({ message: "Booking data not found" });
    }
  } catch (error) {
    // Handle errors and send a 500 Internal Server Error response
    console.error("Error in getAllBookingController:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const flightBookingController = {
  createFlightBooking,
  getBookingHistory,
  cancelFlightBooking,
  getAllBookingController,
};
