import { airSearch } from "./airSearchService";
import { fareRequestSchema } from "./airSearchValidator";

const searchResult = async (req, res) => {
  try {
    const {
      adultCount,
      childCount,
      infantCount,
      segmentsList,
      vendorPref,
      cabin,
      studentFare,
      umrahFare,
      seamanFare,
    } = req.body;
    fareRequestSchema._refinement(req.body);
    const result = await airSearch(
      adultCount,
      childCount,
      infantCount,
      segmentsList,
      vendorPref,
      cabin,
      studentFare,
      umrahFare,
      seamanFare
    );
    res.status(200).json({ results: result });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default searchResult;
