import { hotelPrebook } from "../hotelBooking/hotelBookingService";

export const hotelPreBookRoute = async (req, res) => {
  try {
    const result = await hotelPrebook(req.body);
    res.json(result);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: err.message });
  }
};
