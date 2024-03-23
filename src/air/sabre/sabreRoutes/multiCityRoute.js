import { multiCity } from "../airSearch/multiCity";

export const multiCitySearch = async (req, res, next) => {
  try {
    const {
      type,
      adultCount,
      childCount,
      infantCount,
      segmentsList,
      cabin,
      vendorPref,
    } = req.body;
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    // Perform multicity search
    const results = await multiCity(
      type,
      adultCount,
      childCount,
      infantCount,
      cabin,
      segmentsList,
      vendorPref,
      page,
      pageSize
    );

    res.json(results);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: error.message });
  }
};
