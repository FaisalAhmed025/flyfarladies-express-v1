import axios from "axios";
import { fetchTestToken } from "../../utils/utils";

export const multiCity = async (
  type,
  adultCount,
  childCount,
  infantCount,
  cabin,
  segmentsList,
  vendorPref,
  maxStopsQuantity
) => {
  const accessToken = await fetchTestToken();
  const authUrl = `https://quickticketsb2b-nodejs.de.r.appspot.com/api/v1/api_agent/booking/search-results`;

  const headers = {
    Authorization: `Bearer ${accessToken?.data}`,
  };

  const body = {
    type,
    adultCount,
    childCount,
    infantCount,
    cabin,
    segmentsList,
    vendorPref,
    maxStopsQuantity,
  };
  try {
    // Make the API request with pagination parameters
    const response = await axios.post(authUrl, body, { headers });

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
