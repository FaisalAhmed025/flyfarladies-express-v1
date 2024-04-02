import moment from "moment";
import pool from "../../database/db";
import { generateUUID } from "../../helper/generateUUID";

const hotelIssueRequest = async (req, bookingId) => {
  // Begin transaction
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const tableName = "my_transaction";
    const userId = req.user;

    // Get user's wallet balance
    const [ledgerData] = await connection.query(
      "SELECT wallet FROM b2c_ledger WHERE user_id = ?",
      [userId]
    );
    const walletBalance = ledgerData[0]?.wallet || 0;

    // Get booking details
    const [bookingData] = await connection.query(
      "SELECT amount,hotelBookingId,status FROM hotel_booking_data WHERE userId = ? AND id = ?",
      [userId, bookingId]
    );

    const { amount, status, hotelBookingId } = bookingData[0];
    console.log(amount, hotelBookingId);

    if (status === "Cancelled") {
      throw new Error("Booking Cancelled");
    }
    // Check if the status is already 'Issue Request'
    if (status === "Issue Request") {
      throw new Error("Already in issue request");
    }

    // Check if the wallet balance is sufficient
    if (walletBalance < amount) {
      throw new Error("Insufficient balance");
    }

    // Update status to 'Issue Request'
    await connection.query(
      'UPDATE hotel_booking_data SET status = "Issue Request" WHERE userId = ? AND id = ?',
      [userId, bookingId]
    );

    // Deduct amount from the user's wallet and update ledger
    const newWalletBalance = walletBalance - amount;
    await connection.query(
      "UPDATE b2c_ledger SET wallet = ?, purchase = purchase + ? WHERE user_id = ?",
      [newWalletBalance, amount, userId]
    );

    // Insert a new record into my_transaction table
    //const lastUId = await getLastUId(tableName); // Assuming tableName is defined somewhere
    const createdAt = moment().format("YYYY-MM-DD HH:mm");
    const trxId = `FFlTRX${lastUId}`;
    const transactionId = generateUUID(); // Implement your own logic to generate a unique transaction ID
    const remarksMessage = `${hotelBookingId} Hotel booking issue in process. Amount deducted: ${amount} TK.`;
    const transactionQuery = `
        INSERT INTO my_transaction (id, reference, remarks, amount, last_balance, date, user_id, trxId, type)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Issue Request')
      `;
    console.log(hotelBookingId);
    await connection.query(transactionQuery, [
      transactionId,
      hotelBookingId,
      remarksMessage,
      amount,
      newWalletBalance,
      createdAt,
      userId,
      trxId,
    ]);

    // Commit transaction
    await connection.commit();

    return "Issue request successful";
  } catch (error) {
    // Rollback transaction on error
    if (connection) {
      await connection.rollback();
    }
    throw new Error(error.message);
  } finally {
    // Release connection
    if (connection) {
      connection.release();
    }
  }
};
export const hotelPaymentService = {
  hotelIssueRequest,
};
