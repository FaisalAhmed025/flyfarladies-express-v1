import axios from "axios";
import { fetchTestToken } from "../../utils/utils";

let loadedUUIDs = [];

export const oneway = async (
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
  page = 1,
  pageSize = 10
) => {
  const startIndex = (page - 1) * pageSize;
  console.log(startIndex);
  console.log(page, pageSize);
  const accessToken = await fetchTestToken();

  const authUrl = `http://quickticketsb2b-nodejs.de.r.appspot.com/api/v1/api_agent/booking/search-results`;

  const body = {
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
  };

  const headers = {
    Authorization: `Bearer ${accessToken?.data}`,
  };

  try {
    const response = await axios.post(authUrl, body, { headers });
    const allResults = response?.data || [];
    const totalFlights = allResults.results.length;
    //return allResults;
    // Filter out UUIDs that have already been loaded
    const newResults = allResults.results.filter(
      (result) => !loadedUUIDs.includes(result.uuid)
    );

    // Slice the new results to return only the data for the current page
    const paginatedResults = newResults.slice(
      startIndex,
      startIndex + pageSize
    );

    // Update the loadedUUIDs array with the UUIDs of the newly loaded data
    paginatedResults.forEach((result) => {
      loadedUUIDs.push(result.uuid);
    });

    return {
      totalFlights,
      searchId: allResults.searchId,
      results: paginatedResults,
    };
  } catch (error) {
    console.log(error);
    return "No result found";
  }
};
