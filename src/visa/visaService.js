import axios from "axios";
import { fetchTestToken } from "../air/utils/utils";

export const getVisaInfo = async (countryName, visaType) => {
  try {
    const accessToken = await fetchTestToken();
    const url = `http://quickticketsb2b-nodejs.de.r.appspot.com/api/v1/api_agent/get-visa-info?countryName=${countryName}&visaType=${visaType}`;
    const headers = {
      Authorization: `Bearer ${accessToken?.data}`,
    };
    const result = await axios.get(url, { headers });
    return result.data.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const getCountryName = async () => {
  try {
    const accessToken = await fetchTestToken();
    const url = `http://quickticketsb2b-nodejs.de.r.appspot.com/api/v1/api_agent/get-country-name`;
    const headers = {
      Authorization: `Bearer ${accessToken?.data}`,
    };
    const result = await axios.get(url, { headers });
    return result.data.data;
  } catch (err) {
    throw new Error(err);
  }
};
export const getCountryType = async (countryName) => {
  try {
    const accessToken = await fetchTestToken();
    const url = `http://quickticketsb2b-nodejs.de.r.appspot.com/api/v1/api_agent/get-country-type?countryName=${countryName}`;
    const headers = {
      Authorization: `Bearer ${accessToken?.data}`,
    };
    const result = await axios.get(url, { headers });
    return result.data.data;
  } catch (err) {
    throw new Error(err);
  }
};
