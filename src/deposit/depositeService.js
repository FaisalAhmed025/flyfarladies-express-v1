import pool from "../database/db";
import { deleteImageFromURL } from "../tourpackage/imageHandler";

const generateDepoId = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "FFLD" + Math.floor(Math.random() * 10000);
};

// Create Bank Deposit
const createBankDeposit = async (req) => {
  const connection = await pool.getConnection();
  try {
    const {
      deposited_from,
      deposited_to,
      transaction_date,
      transaction_id,
      amount,
    } = req.body;
    await connection.beginTransaction(); // Begin a new database transaction
    const requested_by = req.params.id;
    const userquery = `SELECT * FROM user WHERE id =? `;
    const [user] = await connection.query(userquery, [requested_by]);
    if (user.length === 0) {
      throw new Error("User not found");
    }
    const image = req.publicImageLink;
    const tableName = "bank_transfer";
    const status = "pending";
    console.log(tableName);
    if (amount < 0) {
      throw new Error(
        "Please check your amount. Negative amount not accepted."
      );
    }
    // Generate a UUID-like ID for the bank transfer
    const deposit_id = generateDepoId();
    const transactionDate = new Date(transaction_date);
    const formattedDate = transactionDate.toDateString();
    const remarks = `Bank Deposit request from ${deposited_from} to ${deposited_to}, On ${formattedDate}.Your TRX ID is ${transaction_id} & amount ${amount} only`;

    console.log(image);
    const value = [
      deposit_id,
      deposited_from,
      deposited_to,
      transaction_date,
      status,
      transaction_id,
      amount,
      requested_by,
      image,
      remarks,
    ];
    const [results] = await connection.query(
      `INSERT INTO ${tableName} ( deposit_id, deposited_from, deposited_to, transaction_date, status, transaction_id, amount, requested_by, attachment,remarks) VALUES (?, ?, ?,?, ?, ?, ?, ?, ?,?)`,
      value
    );
    console.log(value);
    await connection.commit(); // Commit the transaction when the query is successful
    connection.release();
    return results; // Return the ID of the newly created bank transfer
  } catch (error) {
    await connection.rollback(); // Rollback the transaction in case of an error
    await deleteImageFromURL(req.publicImageLink);
    connection.release();
    throw error;
  }
};

const createCheckDeposit = async (req) => {
  const connection = await pool.getConnection();
  try {
    const { cheque_number, bank_name, cheque_date, reference, amount, depositType } =
      req.body;
    await connection.beginTransaction(); // Begin a new database transaction
    const requested_by = req.params.id;
    const image = req.publicImageLink;
    const tableName = "cheque_deposit";

    const userquery = `SELECT * FROM user WHERE id =? `;
    const [user] = await connection.query(userquery, [requested_by]);
    if (user.length === 0) {
      throw new Error("User not found");
    }

    console.log(tableName);
    if (amount < 0) {
      throw new Error(
        "Please check your amount. Negative amount not accepted."
      );
    }
    // Generate a UUID-like ID for the bank transfer
    const deposit_id = generateDepoId();
    const transactionDate = new Date(cheque_date);
    const formattedDate = transactionDate.toDateString();
    const remarks = `Cheque Deposit request from ${cheque_number} to ${bank_name} amount of ${amount}deposited on ${formattedDate}`;
    const value = [
      deposit_id,
      cheque_number,
      bank_name,
      amount,
      image,
      requested_by,
      cheque_date,
      remarks,
      reference,
    ];

    const [results] = await connection.query(
      "INSERT INTO cheque_deposit (deposit_id, cheque_number, bank_name, amount, attachment, requested_by, cheque_date,remarks,reference) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      value
    );
    console.log(value);
    await connection.commit(); // Commit the transaction when the query is successful
    connection.release();
    return results; // Return the ID of the newly created bank transfer
  } catch (error) {
    await connection.rollback(); // Rollback the transaction in case of an error
    deleteImageFromURL(req.publicImageLink);
    connection.release();
    throw error;
  }
};

const createMobilebank = async (req) => {
  const connection = await pool.getConnection();
  try {
    const { payment_method, accountNumber, transactionID, reference, amount } =
      req.body;
    await connection.beginTransaction(); // Begin a new database transaction
    const requested_by = req.params.id;
    const userquery = `SELECT * FROM user WHERE id = ? `;
    const [user] = await connection.query(userquery, [requested_by]);
    if (user.length === 0) {
      throw new Error("User not found");
    }
    const attachment = req.publicImageLink;
    const tableName = "mobilebank";
    console.log(tableName);
    if (amount < 0) {
      throw new Error(
        "Please check your amount. Negative amount not accepted."
      );
    }
    // Generate a UUID-like ID for the bank transfer
    const deposit_id = generateDepoId();
    const fee = (amount * 1.5) / 100;
    // const transactionDate = new Date(cheque_date);
    const requestDate = new Date();
    const remarks = `mobilebank request from ${accountNumber} by ${payment_method} ${reference} ${amount} at ${requestDate}`;
    const [results] = await connection.query(
      "INSERT INTO mobilebank (deposit_id, payment_method, accountNumber, requestDate, gatewayFee,transactionID, requested_by, amount, reference, remarks, attachment) VALUES (?, ?, ?, ?, ?, ?,?,?, ?, ?, ?)",
      [
        deposit_id,
        payment_method,
        accountNumber,
        requestDate,
        fee,
        transactionID,
        requested_by,
        amount,
        reference,
        remarks,
        attachment,
      ]
    );
    await connection.commit(); // Commit the transaction when the query is successful
    connection.release();
    return results; // Return the ID of the newly created bank transfer
  } catch (error) {
    await connection.rollback(); // Rollback the transaction in case of an error
    await deleteImageFromURL(req.publicImageLink);
    connection.release();
    throw error;
  }
};

const ApprovedCashDeposit = async (req) => {
  const connection = await pool.getConnection();
  try {
    const deposit_id = req.params.deposit_id;
    const currentStatusQuery =
      "SELECT status, requested_by FROM cash_deposit WHERE deposit_id = ?";
    const { rejected_reason, status, approved_by } = req.body;

    const [result] = await connection.query(currentStatusQuery, [deposit_id]);
    if (result.length == 0) {
      throw new Error("id not found");
    }

    const updateQuery = `
    UPDATE cash_deposit
    SET status = ?,
    rejected_reason = ?,
    approved_by = ?
    WHERE deposit_id = ?
  `;

    const values = [
      status,
      status === "approved"
        ? rejected_reason !== undefined
          ? rejected_reason
          : null
        : rejected_reason,
      approved_by,
      deposit_id,
    ];

    const getamount = "SELECT amount FROM bank_transfer WHERE deposit_id = ?";
    await connection.beginTransaction();
    let [amountdata] = await connection.execute(getamount, [deposit_id]);
    amount = amountdata[0].amount;
    const [results] = await connection.execute(updateQuery, values);
    // If the status is 'approved', update  the user wallet

    const updateUserWalletQuery = `UPDATE user SET wallet = ? WHERE id = ?`;
    const user_id = result[0].requested_by;
    console.log("Update Query:", updateUserWalletQuery);
    console.log("Values:", [amount, user_id]);

    const [ksocjocj] = await connection.execute(updateUserWalletQuery, [
      amount,
      user_id,
    ]);
    console.log(ksocjocj);
    await connection.commit();
    return ksocjocj;
  } catch (error) {
    console.log(error);
  }
};

const ApprovedBankDeposit = async (req) => {
  const connection = await pool.getConnection();
  try {
    const deposit_id = req.params.deposit_id;
    const currentStatusQuery =
      "SELECT status, requested_by FROM bank_transfer WHERE deposit_id = ?";

    const { rejected_reason, status, approved_by } = req.body;

    const [result] = await connection.query(currentStatusQuery, [deposit_id]);
    if (result.length == 0) {
      throw new Error("id not found");
    }

    const updateQuery = `
    UPDATE bank_transfer
    SET status = ?,
    rejected_reason = ?,
    approved_by = ?
    WHERE deposit_id = ?
  `;
    const values = [
      status,
      status === "approved"
        ? rejected_reason !== undefined
          ? rejected_reason
          : null
        : rejected_reason,
      approved_by,
      deposit_id,
    ];

    const getamount = "SELECT amount FROM bank_transfer WHERE deposit_id = ?";
    await connection.beginTransaction();
    let [amountdata] = await connection.execute(getamount, [deposit_id]);
    amount = amountdata[0].amount;
    const [results] = await connection.execute(updateQuery, values);
    // If the status is 'approved', update  the user wallet

    const updateUserWalletQuery = `UPDATE user SET wallet = ? WHERE id = ?`;
    console.log(updateUserWalletQuery);
    const user_id = result[0].requested_by;

    console.log("Update Query:", updateUserWalletQuery);
    console.log("Values:", [amount, user_id]);
    const [ksocjocj] = await connection.execute(updateUserWalletQuery, [
      amount,
      user_id,
    ]);
    console.log(ksocjocj);
    await connection.commit();
    return ksocjocj;
  } catch (error) {
    console.log(error);
  }
};

const ApprovedCheckDeposit = async (req) => {
  const connection = await pool.getConnection();
  try {
    const deposit_id = req.params.deposit_id;
    const currentStatusQuery =
      "SELECT status, requested_by FROM cheque_deposit WHERE deposit_id = ?";

    const { rejected_reason, status, approved_by } = req.body;

    const [result] = await connection.query(currentStatusQuery, [deposit_id]);
    if (result.length == 0) {
      throw new Error("id not found");
    }

    const updateQuery = `
    UPDATE cheque_deposit
    SET status = ?,
    rejected_reason = ?,
    approved_by = ?
    WHERE deposit_id = ?
  `;
    const values = [
      status,
      status === "approved"
        ? rejected_reason !== undefined
          ? rejected_reason
          : null
        : rejected_reason,
      approved_by,
      deposit_id,
    ];

    const getamount = "SELECT amount FROM cheque_deposit WHERE deposit_id = ?";
    await connection.beginTransaction();
    let [amountdata] = await connection.execute(getamount, [deposit_id]);
    const amount = amountdata[0]?.amount;
    const [results] = await connection.execute(updateQuery, values);
    // If the status is 'approved', update  the user wallet
    const updateUserWalletQuery = `UPDATE user SET wallet = ? WHERE id = ?`;
    const user_id = result[0].requested_by;
    console.log("Update Query:", updateUserWalletQuery);
    console.log("Values:", [amount, user_id]);
    const [ksocjocj] = await connection.execute(updateUserWalletQuery, [
      amount,
      user_id,
    ]);
    await connection.commit();
    return ksocjocj;
  } catch (error) {
    console.log(error);
  }
};

const getuserdeposit = async (req, res) => {
  try {
    const userid = req.params.requested_by;

    const bankDepoQuery = `SELECT * FROM bank_transfer WHERE requested_by = ?`;
    const [bankDeposit] = await pool.query(bankDepoQuery, [userid]);

    const cheqDepoQuery = `SELECT * FROM cheque_deposit WHERE requested_by = ?`;
    const [chequeDeposit] = await pool.query(cheqDepoQuery, [userid]);

    const mobileBankDepoQuery = `SELECT * FROM mobilebank WHERE requested_by = ?`;
    const [mobileDeposit] = await pool.query(mobileBankDepoQuery, [userid]);
    const bkashDeposit = `SELECT * FROM bkaspayment WHERE userid = ?`;
    const [bkashdata] = await pool.query(bkashDeposit, [userid]);
    const combinedResult = [...bankDeposit, ...chequeDeposit, ...mobileDeposit, ...bkashdata];
    return res.json({ alldeposit: combinedResult });
  } catch (error) {
    console.error("Error fetching user deposits:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const depositeService = {
  createBankDeposit,
  createCheckDeposit,
  createMobilebank,
  ApprovedBankDeposit,
  ApprovedCashDeposit,
  ApprovedCheckDeposit,
  getuserdeposit,
};
