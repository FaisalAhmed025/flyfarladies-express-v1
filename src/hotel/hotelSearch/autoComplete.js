import axios from "axios";
import { fetchTestToken } from "../../air/utils/utils";

export const autoComplete = async (asking) => {
  try {
    const baseUrl = `https://quickticketsb2b-nodejs.de.r.appspot.com/api/v1/api_agent/suggestions/${asking}`;
    const basicAuthKey = await fetchTestToken();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${basicAuthKey.data}`,
    };
    const response = await axios.get(baseUrl, { headers });
    return response.data;
  } catch (err) {
    return err.message;
  }
};
