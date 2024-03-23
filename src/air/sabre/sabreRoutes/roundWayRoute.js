import { roundway } from "../airSearch/roundWay";

export const roundWayPostRoute = async (req, res) => {
  try {
    const {
      type,
      departureDate,
      arrivalDate,
      departure,
      arrival,
      adultCount,
      childCount,
      infantCount,
      cabin,
      vendorPref,
      maxStopsQuantity,
    } = req.body;
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const result = await roundway(
      type,
      departureDate,
      arrivalDate,
      departure,
      arrival,
      adultCount,
      childCount,
      infantCount,
      cabin,
      vendorPref,
      maxStopsQuantity,
      page,
      pageSize
    );
    res.json(result);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: err.message });
  }
};
