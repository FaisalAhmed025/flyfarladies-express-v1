import axios from "axios";
import moment from "moment";
import { fetchTestToken } from "../../utils/utils";
import pool from "../../../database/db";
import { generateUUID } from "../../../helper/generateUUID";

const createBooking = async (req, res, next) => {
  try {
    const requestData = req.body;
    // Fetch Access Token
    const accessToken = await fetchTestToken();

    //  Send Request to Booking API
    // const apiEndpoint =
    //   "https://quickticketsb2b-nodejs.de.r.appspot.com/api/v1/api_agent/booking/booking";

    // const response = await axios.post(apiEndpoint, requestData, {
    //   headers: {
    //     Authorization: `Bearer ${accessToken?.data}`,
    //   },
    // });
    //
    const response = true;
    // console.log(response?.data);
    // .data.success
    if (response === true) {
      const headers = {
        Authorization: `Bearer ${accessToken?.data}`,
      };
      console.log(headers);
      // const bookingHistoryEndpoint = `https://quickticketsb2b-nodejs.de.r.appspot.com/api/v1/api_agent/booking/booking_history/${response.data.data[0].booking.id}`;
      const bookingHistoryEndpoint = `https://quickticketsb2b-nodejs.de.r.appspot.com/api/v1/api_agent/booking/booking_history/5fc31d87d95811eea60c42010a63b002`;
      const bookingHistoryResponse = await axios.get(bookingHistoryEndpoint, {
        headers,
      });
      // Extract relevant data from the booking history response
      const bookingInfo = bookingHistoryResponse.data.data.bookingInfo;
      const passengers = bookingHistoryResponse.data.data.passengers;
      const priceBreakdown =
        bookingHistoryResponse.data.data.bookingInfo.priceBreakDown;
      await saveBookingData(bookingInfo);
      const bookingId = bookingInfo.id;
      console.log(bookingId);
      //     // Additionally, you can save flight passengers if needed
      for (const passenger of passengers) {
        await saveFlightPassengers(req, passenger, bookingId);
      }
      //  await savePriceBreakdown(priceBreakdown, bookingId);
      await insertAdditionalData(
        bookingId,
        priceBreakdown,
        bookingHistoryResponse.data.data.bookingInfo.flightDetailsAndPrices,
        bookingHistoryResponse.data.data.fare
      );
      return {
        passengers,
      };
    } else {
      throw new Error(response?.data.message);
    }
  } catch (error) {
    console.log("Error booking flight:", error.message);
    throw new Error(error.response.data.message);
  }
};
const saveBookingData = async (bookingInfo) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const userId = "FFLU525";
    const tableName = "flight_booking";
    const airlinesName =
      bookingInfo.flightDetailsAndPrices.flightDetailsByType[0].airlineName;
    const payAmount =
      bookingInfo.flightDetailsAndPrices.bookingTotalPrices.clientPrice;
    const isRefundable =
      bookingInfo.flightDetailsAndPrices.bookingTotalPrices.isRefundable;
    // Generate remarks message by concatenating desired fields
    const remarksMessage = `${bookingInfo.deptFrom}-${bookingInfo.arriveTo}, ${bookingInfo.tripType}, ${airlinesName}, Air Ticket Booked at ${bookingInfo.bookedAt}`;
    const values = [
      generateUUID(),
      bookingInfo.bookingId,
      bookingInfo.pax,
      bookingInfo.id,
      bookingInfo.adultBag,
      bookingInfo.deptFrom,
      bookingInfo.arriveTo,
      bookingInfo.childBag,
      bookingInfo.infantBag,
      bookingInfo.adultCount,
      bookingInfo.childCount,
      bookingInfo.infantCount,
      bookingInfo.currency,
      bookingInfo.status,
      bookingInfo.timeLimit,
      bookingInfo.airlinesPNR,
      bookingInfo.bookedAt,
      userId,
      bookingInfo.tripType,
      remarksMessage,
      airlinesName,
      bookingInfo.journeyType,
      payAmount,
      isRefundable,
    ];

    const [rows] = await pool.query(
      "INSERT INTO flight_booking (id, bookingRef, pax, booking_id, adultBag, deptFrom, arrivalTo, " +
        "childBag, infantBag, adultCount, childCount, infantCount, currency, status, timeLimit, " +
        "airlinesPnr, assignTime, user_id, tripType, remarks,airlinesName,journeyType,amount,isRefundable) VALUES (?,?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values
    );
    const lastUId = await rows.insertId;
    const bId = `FFLFB${lastUId}`;
    // Update the record in the database with the generated id
    await pool.execute(`UPDATE ${tableName} SET bookingId = ? WHERE uId = ?`, [
      bId,
      lastUId,
    ]);
    await connection.commit();
    connection.release();
    return bookingInfo.bookingId;
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.log("Error saving booking data:", error);
    throw new Error("Failed to save booking data");
  }
};
const saveFlightPassengers = async (req, passengerData, bookingId) => {
  try {
    const userId = "FFLU525";
    const createdAt = moment().format("YYYY-MM-DD HH:mm");
    const updatedAt = createdAt;
    const values = [
      generateUUID(),
      passengerData.id,
      userId,
      passengerData.paxId,
      passengerData.prefix,
      passengerData.firstName,
      passengerData.lastName,
      passengerData.dob,
      passengerData.type,
      passengerData.passNation,
      passengerData.passNo,
      passengerData.passEx,
      passengerData.phone,
      passengerData.email,
      passengerData.address,
      passengerData.gender,
      passengerData.passportCopy,
      passengerData.visaCopy,
      createdAt,
      updatedAt,
      bookingId,
    ];
    const [rows] = await pool.query(
      "INSERT INTO flight_passenger (id,passenger_id,user_id, paxId, prefix, firstName, " +
        "lastName, dob, type, passNation, passNo, passEx, phone, email, address, " +
        "gender, passportCopy, visaCopy, createdAt, updatedAt,booking_id) " +
        "VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
      values
    );
    return passengerData.id;
  } catch (error) {
    console.error("Error saving flight passenger data:", error.message);
    throw new Error("Failed to save flight passenger data");
  }
};
const insertAdditionalData = async (
  bookingId,
  priceBreakdown,
  flightDetailsAndPrices,
  fare
) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Combine additional data objects into a single object
    const combinedAdditionalData = {
      priceBreakdown,
      flightDetailsAndPrices,
      fare,
    };
    console.log(combinedAdditionalData);
    const userId = "FFLU525";
    // Insert additional data into the booking_additional_data table
    const [result] = await connection.query(
      "INSERT INTO flight_details(id, booking_id, data,user_id) VALUES (?, ?, ?, ?)",
      [
        generateUUID(),
        bookingId,
        JSON.stringify(combinedAdditionalData),
        userId,
      ]
    );

    await connection.commit();
    connection.release();
    console.log(result);
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error("Error saving additional data:", error.message);
    throw new Error("Failed to save additional data");
  }
};
const cancelBooking = async (req, res, next) => {
  const id = req.params.id;
  // Fetch Access Token
  const accessToken = await fetchTestToken();
  // // Send Request to Booking API
  const apiEndpoint = `https://quickticketsb2b-nodejs.de.r.appspot.com/api/v1/api_agent/booking/cancel_booking/${id}`;

  try {
    const response = await axios.delete(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken?.data}`,
      },
    });

    if (response.data.success === true) {
      await updateBookingStatusToCancelled(id);
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
const getAllBookingData = async (booking_id) => {
  try {
    const connection = await pool.getConnection();
    try {
      const user_id = "FFLU525";

      // Fetch data from the booking table
      const [bookingResults] = await connection.query(
        "SELECT * FROM flight_booking WHERE user_id = ? AND booking_id = ?",
        [user_id, booking_id]
      );

      // Fetch data from the flight_passenger table
      const [passengerResults] = await connection.query(
        "SELECT * FROM flight_passenger WHERE user_id = ? AND booking_id = ?",
        [user_id, booking_id]
      );

      // Fetch data from the booking_additional_data table
      const [additionalDataResults] = await connection.query(
        "SELECT data FROM flight_details WHERE user_id = ? AND booking_id = ?",
        [user_id, booking_id]
      );

      const additionalData = additionalDataResults[0].data;

      // Combine all data into a single object
      const result = {
        bookingInfo: {
          ...bookingResults[0],
          priceBreakdown: additionalData.priceBreakdown || [],
          flightDetailsAndPrices: additionalData.flightDetailsAndPrices,
        },
        passengers: passengerResults,
        fare: additionalData.fare,
      };

      return result;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error fetching booking data:", error.message);
    throw new Error("Failed to fetch booking data");
  }
};
const getBookingHistory = async (req, res) => {
  try {
    const userId = "FFLU525";
    const query = `
      SELECT
        b.id,
        b.deptFrom,
        b.arrivalTo,
        b.booking_id,
        b.adultCount,
        b.childCount,
        b.infantCount,
        b.bookingId,
        b.status,
        b.timeLimit,
        b.remarks,
        b.tripType,
        b.airlinesName
        FROM
        flight_booking AS b
      WHERE
        b.user_id = ?
      ORDER BY
        b.uId DESC;
    `;
    const [result] = await pool.query(query, [userId]);

    if (!userId) {
      return "No user found";
    }

    // Modify the result to include the formatted remarks
    const formattedResult = result.map((row) => {
      const match =
        row.remarks &&
        row.remarks.match(/at(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)/);
      const dateTimeAfterAt = match ? match[1] : null;
      const formattedDateTime = dateTimeAfterAt
        ? moment(dateTimeAfterAt).format("DD MMM YYYY H:mm") // Format the date as desired
        : null;

      const dynamicPart = row.remarks
        ? row.remarks.split("Air Ticket booked at ")[0]
        : "";

      return {
        ...row,
        remarks: formattedDateTime
          ? `${dynamicPart} Air Ticket Booked at ${formattedDateTime}`
          : row.remarks,
      };
    });

    return formattedResult;
  } catch (error) {
    console.log("error", error.message);
    // Consider sending an error response to the client or handling the error appropriately.
    throw new Error("Failed to fetch booking history", error.message);
  }
};

export const flightBookingService = {
  createBooking,
  cancelBooking,
  getAllBookingData,
  getBookingHistory,
};
