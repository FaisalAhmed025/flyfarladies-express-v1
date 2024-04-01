import moment from "moment/moment";
import { fetchTestToken } from "../../air/utils/utils";
import pool from "../../database/db";
import { generateUUID } from "../../helper/generateUUID";
import axios from "axios";

export const hotelPrebook = async (requestData) => {
  const accessToken = await fetchTestToken();
  const authUrl = `https://quickticketsb2b-nodejs.de.r.appspot.com/api/v1/api_agent/hotel_prebook`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken?.data}`,
  };
  try {
    const response = await axios.post(authUrl, requestData, { headers });
    return response.data;
  } catch (error) {
    return error;
  }
};
export const insertMultipleHotelBookings = async (bookings, req) => {
  const insertedIds = [];
  console.log(bookings);
  const partnerOrderId = generateUUID(); // Generate a single partnerOrderId for all bookings
  for (const booking of bookings) {
    const data = await insertHotelBooking(
      booking.bookingData,
      req,
      partnerOrderId
    );
    insertedIds.push(data);
  }
  return insertedIds;
};
const insertHotelBooking = async (bookingData, req, partnerOrderId) => {
  const connection = await pool.getConnection();
  try {
    const agentId = req.user; // Assuming you have agent information in the request
    const id = generateUUID(); // Generate a unique ID for the booking
    const createdAt = moment().format("YYYY-MM-DD HH:mm");
    const query = `INSERT INTO hotel_booking_data (
            id,
            partnerOrderId,
            amount,
            type,
            status,
            email,
            phone,
            userId,
            createdAt,
            freeCancellation,
            roomName,
            hotelName,
            bookingCode,
            hotelImage
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      id,
      partnerOrderId,
      bookingData.amount,
      bookingData.type,
      bookingData.status || "Hold",
      bookingData.email,
      bookingData.phone,
      agentId,
      createdAt,
      bookingData.freeCancellation,
      bookingData.roomName,
      bookingData.hotelName,
      bookingData.bookingCode,
      bookingData.hotelImage,
    ];
    console.log(values);
    const [results] = await connection.execute(query, values);
    const hotelBookingId = `FFLHB${results.insertId}`;
    // Update the record in the database with the generated id
    await connection.execute(
      `UPDATE hotel_booking_data SET hotelBookingId = ? WHERE id = ?`,
      [hotelBookingId, id]
    );
    await insertGuestInformation(
      connection,
      bookingData.guestDataArray,
      id,
      partnerOrderId
    );
    connection.release(); // Release the connection back to the pool
    return id; // Return the ID of the newly created booking
  } catch (error) {
    if (connection) {
      connection.release(); // Release the connection in case of an error
    }
    throw error;
  }
};
const insertGuestInformation = async (
  connection,
  guestDataArray,
  hotelBookingId,
  partnerOrderId
) => {
  try {
    const resultsArray = [];

    for (const guestData of guestDataArray) {
      const id = generateUUID(); // Generate a unique ID for each guest information
      const query = `INSERT INTO guestData (
              id,
              hotelBookingId,
              partnerOrderId,
              passportNumber,
              dob,
              passportExpiryDate,
              firstName,
              lastName,
              gender,
              nationality
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        id,
        hotelBookingId,
        partnerOrderId,
        guestData.passportNumber,
        guestData.dob,
        guestData.passportExpiryDate,
        guestData.firstName,
        guestData.lastName,
        guestData.gender,
        guestData.nationality,
      ];
      console.log(values);
      const [results] = await connection.execute(query, values);
      resultsArray.push(results.insertId);
    }

    return resultsArray; // Return an array of insert IDs for the newly created guest information
  } catch (error) {
    throw error;
  }
};
export const getSingleBookingInfo = async (req, bookingId) => {
  try {
    const agentMainID = req.user; // Assuming agentMainID is passed in the URL parameters

    // Query to fetch booking information along with guest information based on agentMainID and bookingId
    const query = `
        SELECT
          hb.id AS hotelBookingId,
          hb.hotelBookingId AS bookingId,
          hb.partnerOrderId,
          hb.amount,
          hb.roomName,
          hb.type,
          hb.status,
          hb.email,
          hb.phone,
          hb.freeCancellation,
          hb.hotelImage,
          hb.hotelName,
          hb.userId,
          gi.id AS guestId,
          gi.gender,
          gi.nationality,
          gi.passportNumber,
          gi.dob,
          gi.passportCopy,
          gi.passportExpiryDate,
          gi.firstName,
          gi.lastName
        FROM
        hotel_booking_data hb
        LEFT JOIN
          guestData gi ON hb.id = gi.hotelBookingId
        WHERE
          hb.userId = ? AND hb.id = ?
      `;

    // Execute the query
    const [results] = await pool.execute(query, [agentMainID, bookingId]);

    // Organize guest information in an array if multiple guests are associated with the same booking ID
    const bookingInfo = {
      hotelBookingId: results[0].hotelBookingId,
      bookingId: results[0].bookingId,
      itemId: results[0].itemId,
      partnerOrderId: results[0].partnerOrderId,
      amount: results[0].amount,
      roomName: results[0].roomName,
      freeCancellation: results[0].freeCancellation,
      type: results[0].type,
      status: results[0].status,
      email: results[0].email,
      phone: results[0].phone,
      userId: results[0].userId,
      guests: results.map((guest) => ({
        guestId: guest.guestId,
        gender: guest.gender,
        nationality: guest.nationality,
        passportNumber: guest.passportNumber,
        dob: guest.dob,
        passportExpiryDate: guest.passportExpiryDate,
        firstName: guest.firstName,
        lastName: guest.lastName,
        nidCopy: guest.passportCopy,
      })),
    };

    return bookingInfo;
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    throw error; // Propagate the error to the caller
  }
};
export const uploadNidCopy = async (req, hotelBookingId) => {
  try {
    const image = req.publicImageLink;
    const query = `
        UPDATE guestData
        SET passportCopy = ?
        WHERE id = ?
      `;
    const [result] = await pool.execute(query, [image, hotelBookingId]);
    if (result.affectedRows === 1) {
      return "Passport copy uploaded successfully";
    } else {
      return "Failed to upload passport copy";
    }
  } catch (error) {
    console.error("Error:", error);
    return "An error occurred while updating passport copy";
  }
};
export const updateBookingStatusToCancelled = async (req, bookingId) => {
  try {
    // Assuming you have a database connection pool named 'pool'
    const userId = req.user;
    // Select the hotel booking data for the specified userId and bookingId
    const selectQuery = `
        SELECT *
        FROM hotel_booking_data
        WHERE userId = ? AND id = ?
      `;
    const [bookingResults] = await pool.execute(selectQuery, [
      userId,
      bookingId,
    ]);

    // Check if any booking data was found
    if (bookingResults.length === 0) {
      return "No hotel booking found for the specified user and ID";
    }

    // Extract the hotel booking ID from the retrieved data
    const hotelBookingId = bookingResults[0].hotelBookingId;

    // Update the status field to 'cancelled' for the selected booking ID
    const updateQuery = `
        UPDATE hotel_booking_data
        SET status = 'Cancelled'
        WHERE id = ?
      `;
    const [updateResult] = await pool.execute(updateQuery, [hotelBookingId]);

    // Check if the status was successfully updated
    if (updateResult.affectedRows === 1) {
      return "Booking status updated to 'cancelled'";
    } else {
      return "Failed to update booking status";
    }
  } catch (error) {
    console.error("Error:", error);
    return "An error occurred while updating booking status";
  }
};
export const getBookingInfo = async (req, res) => {
  try {
    const userId = req.user;
    // Query to fetch booking information based on agentMainID
    const bookingQuery = `
      SELECT
        hb.id AS hotelBookingId,
        hb.uId,
        hb.hotelBookingId AS bookingId,
        hb.partnerOrderId,
        hb.amount,
        hb.type,
        hb.status,
        hb.email,
        hb.phone,
        hb.roomName,
        hb.freeCancellation,
        hb.hotelImage,
        hb.hotelName,
        hb.userId
      FROM
        hotel_booking_data hb
      WHERE
        hb.userId = ?
        ORDER BY
        hb.uId
    `;

    // Execute the booking query
    const [bookingResults] = await pool.execute(bookingQuery, [userId]);

    // Fetch guest information for each booking
    const bookings = [];
    for (const booking of bookingResults) {
      const guestsQuery = `
        SELECT
          gi.id AS guestId,
          gi.passportNumber,
          gi.dob,
          gi.partnerOrderId,
          gi.passportExpiryDate,
          gi.firstName,
          gi.lastName
        FROM
          guestData gi
        WHERE
          gi.hotelBookingId = ?
      `;
      const [guestsResults] = await pool.execute(guestsQuery, [
        booking.hotelBookingId,
      ]);
      const guests = guestsResults.map((guest) => ({
        guestId: guest.guestId,
        passportNumber: guest.passportNumber,
        dob: guest.dob,
        partnerOrderId: guest.partnerOrderId,
        passportExpiryDate: guest.passportExpiryDate,
        firstName: guest.firstName,
        lastName: guest.lastName,
      }));
      bookings.push({
        ...booking,
        guests: guests,
      });
    }

    return bookings;
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
  }
};
