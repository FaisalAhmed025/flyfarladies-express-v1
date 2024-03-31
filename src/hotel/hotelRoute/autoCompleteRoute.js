import { autoComplete } from "../hotelSearch/autoComplete";

const rateHawkAutoCompleteResult = async (req, res) => {
  try {
    const asking = req.params.asking;
    const result = await autoComplete(asking);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export default rateHawkAutoCompleteResult;
