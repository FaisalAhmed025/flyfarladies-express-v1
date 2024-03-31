import { hotelSearch } from "../hotelSearch/hotelSearch";

export const hotelSearchRoute = async (req, res) => {
  try {
    const page = req?.query?.page;
    const pageSize = req?.query?.pageSize;
    const result = await hotelSearch(req.body, page, pageSize);
    res.json(result);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: err.message });
  }
};
