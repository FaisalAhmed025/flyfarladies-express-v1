import axios from "axios";
import { fetchTestToken } from "../../air/utils/utils";

export const hotelSearch = async (requestData, page, pageSize) => {
  const accessToken = await fetchTestToken();
  const authUrl = `https://quickticketsb2b-nodejs.de.r.appspot.com/api/v1/api_agent/hotel_v2.0?page=${page}&pageSize=${pageSize}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken?.data}`,
  };

  const requestBody = {
    ...requestData,
  };

  try {
    const response = await axios.post(authUrl, requestBody, { headers });
    const allResults = response?.data;
    return allResults;
  } catch (error) {
    return "No hotel found";
  }
};
