import axios from "axios";
import { fetchTestToken } from "../../utils/utils";

let loadedFlightIds = [];

export const roundway = async (
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
  pageSize = 10 // Default pageSize is 20
) => {
  const offset = (page - 1) * pageSize; // Calculate offset based on page and pageSize

  try {
    const accessToken = await fetchTestToken();
    const authUrl = `https://quickticketsb2b-nodejs.de.r.appspot.com/api/v1/api_agent/booking/search-results`;

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

    // Make the API request with pagination parameters
    const response = await axios.post(authUrl, body, { headers });

    // Paginate the response data
    const flightsData = response?.data?.results || [];
    const totalFlights = flightsData.length;

    // Filter and paginate flightsData based on loadedFlightIds
    const paginatedFlights = flightsData
      .filter((flight) => !loadedFlightIds.includes(flight.uuid)) // Exclude already loaded items
      .slice(offset, offset + pageSize); // Slice based on offset and pageSize

    // Update loadedFlightIds with the UUIDs of the flights that have been loaded
    const pageFlightIds = paginatedFlights.map((flight) => flight.uuid);
    loadedFlightIds = [...loadedFlightIds, ...pageFlightIds];

    return {
      flightsFound: totalFlights,
      results: paginatedFlights,
      searchId: response?.data?.searchId,
    };
  } catch (error) {
    console.log(error);
    return [];
  }
};
