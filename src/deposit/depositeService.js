import { constants } from "fs/promises";
import pool from "../database/db";
import { deleteImageFromURL } from "../tourpackage/imageHandler";
import nodemailer from 'nodemailer'
import { createHash } from "crypto";
 
const generateDepoId = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "FFLD" + Math.floor(Math.random() * 10000);
};


const generateTransactionId = () => {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substr(2, 6); // Generate a random alphanumeric string
  const hash = createHash('sha256').update(`${timestamp}${randomString}`).digest('hex');
  const shortenedHash = hash.substr(0, 16).toUpperCase();
  return shortenedHash;
}

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
    const userquery = `SELECT * FROM user WHERE id =?`;
    const [user] = await connection.query(userquery, [requested_by]);
    if (user.length === 0) {
      throw new Error("User not found");
    }

    if(user[0]?.phone ===''){
      return res.send({message: "please update your phone number" });
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
    const date = new Date();
    // const formattedDate = transactionDate.toDateString();
    const remarks = `Bank Deposit request from ${deposited_from} to ${deposited_to}, On ${formattedDate}.Your TRX ID is ${transaction_id} & amount ${amount} only`;
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


    const options = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'Asia/Dhaka' 
    };

    const formattedDate = date.toLocaleString('en-BD', options);

    const transporter = nodemailer.createTransport({
      host: 'b2b.flyfarint.com', // Replace with your email service provider's SMTP host
      port: 465, // Replace with your email service provider's SMTP port
      secure: true, // Use TLS for secure connection
      auth: {
        user: 'flyfarladies@mailservice.center', // Replace with your email address
        pass: 'YVWJCU.?UY^R', // Replace with your email password
      },
    });

    const htmltemplate =`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Deposit Request</title>
      </head>
      <body>
        <div style="width: 700px; height: 110vh; margin: 0 auto">
          <div style="width: 700px; height: 70px; background: #fe99a6">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 700px;
              "
            >
              <tr>
                <td
                  align="center"
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #ffffff;
                    font-family: sans-serif;
                    font-size: 15px;
                    line-height: 38px;
                    padding: 20px 0 20px 0;
                    text-transform: uppercase;
                    letter-spacing: 5px;
                  "
                >
                  Deposit Confirmation
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 700px;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    background-color: #efefef;
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #584660;
                    font-family: sans-serif;
                    font-size: 30px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 20px 40px 0px 55px;
                  "
                >
                  ${amount}
                </td>
              </tr>
              <tr>
                <td
                  valign="top"
                  style="
                    background-color: #efefef;
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #bc6277;
                    font-family: sans-serif;
                    font-size: 17px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 0px 40px 20px 55px;
                  "
                >
                BANK
                </td>
              </tr>
            </table>
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 620px;
                background-color: #ffffff;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #bc6277;
                    font-family: sans-serif;
                    font-size: 15px;
                    font-weight: 600;
                    line-height: 38px;
                    padding: 10px 20px 5px 20px;
                  "
                >
                  Transaction Details
                </td>
              </tr>
    
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                  Transaction ID
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                ${deposit_id}
                </td>
              </tr>

              
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              User Contact
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${user[0]?.phone}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              User Email
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${user[0]?.email}
            </td>

          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              User Name
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${user[0]?.name}
            </td>
          </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                  DepositFrom
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                  ${deposited_from}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                  width: 180px;
                "
              >
                DepositTo
              </td>
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                "
              >
                ${deposited_to}
              </td>
            </tr>

            <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              Payment Status
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
              ${status}
            </td>
          </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                  Transaction Date
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                  ${transaction_date}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                  Requested BY
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                  ${requested_by}
                </td>
              </tr>

              <tr style="border-bottom: 1px solid #dfdfdf">
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                  width: 180px;
                "
              >
                Transaction Date
              </td>
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                "
              >
                ${transaction_date}
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #dfdfdf">
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                  width: 180px;
                "
              >
                Requested  At
              </td>
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                "
              >
                ${formattedDate}
              </td>
            </tr>

            </table>
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 670px;
                margin-top: 15px;
                color: #ffffff !important;
                text-decoration: none !important;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 600;
                    font-style: italic;
                  "
                >
                  Please Wait a little while. Your money will be added to your
                  wallet after verification is complete.
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 670px;
                background-color: #702c8b;
                margin-top: 25px;
                text-align: center;
                color: #ffffff !important;
                text-decoration: none !important;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 16px;
                    font-weight: 500;
                    padding: 20px 20px 0px 20px;
                  "
                >
                  Need more help?
                </td>
              </tr>
    
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 12px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 0px 20px 10px 20px;
                  "
                >
                  Mail us at
                  <span style="color: #ffffff !important; text-decoration: none"
                    >support@flyfarladies.com</span
                  >
                  or Call us at +88 01755582111
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="left"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 420px;
                color: #ffffff;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 13px;
                    font-weight: 600;
                    padding: 20px 0px 0px 45px;
                    color: #767676;
                  "
                >
                  <a style="padding-right: 20px; color: #584660" href="http://"
                    >Terms & Conditions</a
                  >
    
                  <a style="padding-right: 20px; color: #584660" href="http://"
                    >Booking Policy</a
                  >
    
                  <a style="padding-right: 20px; color: #584660" href="http://"
                    >Privacy Policy</a
                  >
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                width: 700px;
                color: #ffffff;
                margin-top: 85px;
              "
            >
              <tr>
                <td style="padding-left: 45px">
                  <img
                    style="padding-right: 5px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png"
                    href="https://www.facebook.com/flyfarladies/?ref=page_internal"
                    alt=""
                  />
                  <img
                    style="padding-right: 5px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png"
                    href="https://www.linkedin.com/company/fly-far-ladies/"
                    alt=""
                  />
                  <img
                    style="padding-right: 5px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png"
                    href="https://wa.me/+88 01755582111"
                    alt=""
                  />
                </td>
              </tr>
    
              <tr>
                <td
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 13px;
                    font-weight: 500;
                    padding: 5px 0px 0px 45px;
                    color: #767676;
                    padding-bottom: 2px;
                  "
                >
                  Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.
                </td>
    
                <td
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-weight: 500;
                    color: #767676;
                    padding-bottom: 20px;
                  "
                >
                  <img
                    width="100px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png"
                    href="https://www.flyfarladies.com/"
                    alt=""
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </body>
    </html>
    `

    const usermail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: user[0].email, // Recipient's email address
      bcc: 'shornali@flyfarladies.com, ceo@flyfar.org,afridi@flyfar.tech', // List of BCC receivers
      subject: 'Deposit Details',
      text: 'Please find the attached file.',
      html:htmltemplate
    };

    const supportmail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: user[0].email, // Recipient's email address
      subject: 'Deposit Details',
      text: 'Please find the attached file.',
      html:htmltemplate
    };
    await transporter.sendMail(usermail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });

    await transporter.sendMail(supportmail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
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

const ApprovedBankDeposit = async (req) => {
  const connection = await pool.getConnection();
  try {
    const deposit_id = req.params.deposit_id;
    if(deposit_id.length ==0){
      return res.send({status:false, message:"deposit not found"})
    }
    const {action_by } = req.body;
    const depositQuery = "SELECT * FROM bank_transfer WHERE deposit_id = ?";
    const [result] = await pool.query(depositQuery, [deposit_id]);
    const amount = result[0].amount;
    const updateQuery =`
    UPDATE bank_transfer
    SET status = ?,
    action_by = ?
    WHERE deposit_id = ?
  `;
  const  status = "approved"
    const values = [
      status,
      action_by,
      deposit_id,
    ];

    const remarks = `Bank Deposit request approved from ${result[0].deposited_from} to ${result[0].deposited_to}, On ${result[0].transaction_date}.TRX ID is ${result[0].transaction_id} & amount ${result[0].amount} only`;

    await pool.query(updateQuery, values)
    await connection.beginTransaction();

    // If the status is 'approved', update  the user wallet

    const updateUserWalletQuery = `UPDATE user SET wallet = wallet+? WHERE id = ?`;
    const user_id = result[0].requested_by;
    const  userquery= `SELECT * FROM user WHERE id =?`
   
    const [updatewallet] = await connection.execute(updateUserWalletQuery, [
      amount,
      user_id,
    ]);
    const [user] = await pool.query(userquery, [user_id])

    const ledgerquery = `INSERT INTO ledger(user_id, referenceid, transactionid, transactionType, purchase, lastBalance, actionBy, remarks) VALUES (?, ?, ?, ?,?,?,?, ?)`;

    const deposit ='Deposit'
    const transactionid = generateTransactionId()
    const ledger = await connection.execute(ledgerquery, [
      result[0].requested_by,
      deposit_id,
      transactionid,
      deposit,
      result[0].amount,
      user[0].wallet,
      action_by,
      remarks,
    ]);
    

    const date = new Date()

    const options = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'Asia/Dhaka' 
    };

    const approvedAt = date.toLocaleString('en-BD', options);
    const transporter = nodemailer.createTransport({
      host: 'b2b.flyfarint.com', // Replace with your email service provider's SMTP host
      port: 465, // Replace with your email service provider's SMTP port
      secure: true, // Use TLS for secure connection
      auth: {
        user: 'flyfarladies@mailservice.center', // Replace with your email address
        pass: 'YVWJCU.?UY^R', // Replace with your email password
      },
    });

   const htmltemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Deposit Request</title>
  </head>
  <body>
    <div style="width: 700px; height: 110vh; margin: 0 auto">
      <div style="width: 700px; height: 70px; background: #fe99a6">
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 700px;
          "
        >
          <tr>
            <td
              align="center"
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #ffffff;
                font-family: sans-serif;
                font-size: 15px;
                line-height: 38px;
                padding: 20px 0 20px 0;
                text-transform: uppercase;
                letter-spacing: 5px;
              "
            >
              ${status}
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 700px;
          "
        >
          <tr>
            <td
              valign="top"
              style="
                background-color: #efefef;
                border-collapse: collapse;
                border-spacing: 0;
                color: #584660;
                font-family: sans-serif;
                font-size: 30px;
                font-weight: 500;
                line-height: 38px;
                padding: 20px 40px 0px 55px;
              "
            >
              ${result[0].amount}
            </td>
          </tr>
          <tr>
            <td
              valign="top"
              style="
                background-color: #efefef;
                border-collapse: collapse;
                border-spacing: 0;
                color: #bc6277;
                font-family: sans-serif;
                font-size: 17px;
                font-weight: 500;
                line-height: 38px;
                padding: 0px 40px 20px 55px;
              "
            >
              BANK
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 620px;
            background-color: #ffffff;
          "
        >
          <tr>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #bc6277;
                font-family: sans-serif;
                font-size: 15px;
                font-weight: 600;
                line-height: 38px;
                padding: 10px 20px 5px 20px;
              "
            >
              Transaction Details
            </td>
          </tr>

          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              Trasaction ID
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${result[0].deposit_id}
            </td>
          </tr>

          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              User Contact
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${user[0]?.phone}
            </td>
          </tr>


          
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              User Email
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${user[0]?.email}
            </td>

          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              User Name
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${user[0]?.name}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              DepositFrom
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
              ${result[0]?.deposited_from}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
              width: 180px;
            "
          >
            Approved At
          </td>
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
            "
          >
            ${approvedAt}
          </td>
        </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
              width: 180px;
            "
          >
            DepositTo
          </td>
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
            "
          >
            ${result[0]?.deposited_to}
          </td>
        </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              Transaction Date
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
              ${result[0].transaction_date}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              DepositType
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
              BANK
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 670px;
            margin-top: 15px;
            color: #ffffff !important;
            text-decoration: none !important;
          "
        >
          <tr>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 600;
                font-style: italic;
              "
            >
              Please Wait a little while. Your money will be added to your
              wallet after verification is complete.
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 670px;
            background-color: #702c8b;
            margin-top: 25px;
            text-align: center;
            color: #ffffff !important;
            text-decoration: none !important;
          "
        >
          <tr>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                font-family: sans-serif;
                font-size: 16px;
                font-weight: 500;
                padding: 20px 20px 0px 20px;
              "
            >
              Need more help?
            </td>
          </tr>

          <tr>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                font-family: sans-serif;
                font-size: 12px;
                font-weight: 500;
                line-height: 38px;
                padding: 0px 20px 10px 20px;
              "
            >
              Mail us at
              <span style="color: #ffffff !important; text-decoration: none"
                >support@flyfarladies.com</span
              >
              or Call us at +88 01755582111
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="left"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 420px;
            color: #ffffff;
          "
        >
          <tr>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                font-family: sans-serif;
                font-size: 13px;
                font-weight: 600;
                padding: 20px 0px 0px 45px;
                color: #767676;
              "
            >
              <a style="padding-right: 20px; color: #584660" href="http://"
                >Terms & Conditions</a
              >

              <a style="padding-right: 20px; color: #584660" href="http://"
                >Booking Policy</a
              >

              <a style="padding-right: 20px; color: #584660" href="http://"
                >Privacy Policy</a
              >
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            width: 700px;
            color: #ffffff;
            margin-top: 85px;
          "
        >
          <tr>
            <td style="padding-left: 45px">
              <img
                style="padding-right: 5px"
                src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png"
                href="https://www.facebook.com/flyfarladies/?ref=page_internal"
                alt=""
              />
              <img
                style="padding-right: 5px"
                src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png"
                href="https://www.linkedin.com/company/fly-far-ladies/"
                alt=""
              />
              <img
                style="padding-right: 5px"
                src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png"
                href="https://wa.me/+88 01755582111"
                alt=""
              />
            </td>
          </tr>

          <tr>
            <td
              style="
                border-collapse: collapse;
                border-spacing: 0;
                font-family: sans-serif;
                font-size: 13px;
                font-weight: 500;
                padding: 5px 0px 0px 45px;
                color: #767676;
                padding-bottom: 2px;
              "
            >
              Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.
            </td>

            <td
              style="
                border-collapse: collapse;
                border-spacing: 0;
                font-family: sans-serif;
                font-weight: 500;
                color: #767676;
                padding-bottom: 20px;
              "
            >
              <img
                width="100px"
                src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png"
                href="https://www.flyfarladies.com/"
                alt=""
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </body>
</html>
`

    const usermail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: user[0].email, // Recipient's email address
      bcc: 'shornali@flyfarladies.com, ceo@flyfar.org,afridi@flyfar.tech',
      subject: 'Deposit Details',
      text: 'Please find the attached file.',
      html:htmltemplate

    };

    const supportmail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: 'support@flyfarladies.com', // Recipient's email address
      subject: 'Deposit Details',
      text: 'Please find the attached file.',
      html:htmltemplate
    };
    await transporter.sendMail(usermail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
    await transporter.sendMail(supportmail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
    await connection.commit();
  } catch (error) {
    console.log(error);
  }
};

const RejectBankDeposit = async (req) => {
  const connection = await pool.getConnection();
  try {
    const deposit_id = req.params.deposit_id;
    const {action_by, rejected_reason } = req.body;
    const depositQuery = "SELECT * FROM bank_transfer WHERE deposit_id = ?";
    const [result] = await pool.query(depositQuery, [deposit_id]);
    const amount = result[0].amount;
    const updateQuery = `
    UPDATE bank_transfer
    SET status = ?,
    action_by = ?,
    rejected_reason=?
    WHERE deposit_id = ?
  `;

  const status = "rejected"
    const values = [
      status,
      action_by,
      rejected_reason,
      deposit_id,
    ];

    console.log(values)

    const [data] = await pool.query(updateQuery, values)
    // If the status is 'approved', update  the user wallet
    const user_id = result[0].requested_by;
    const  userquery= `SELECT * FROM user WHERE id =?`
    const [user] = await pool.query(userquery, [user_id])
    const date = new Date()

    const options = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'Asia/Dhaka' 
    };

    const approvedAt = date.toLocaleString('en-BD', options);

    const transporter = nodemailer.createTransport({
      host: 'b2b.flyfarint.com', // Replace with your email service provider's SMTP host
      port: 465, // Replace with your email service provider's SMTP port
      secure: true, // Use TLS for secure connection
      auth: {
        user: 'flyfarladies@mailservice.center', // Replace with your email address
        pass: 'YVWJCU.?UY^R', // Replace with your email password
      },
    });

const htmltemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Deposit Request</title>
  </head>
  <body>
    <div style="width: 700px; height: 110vh; margin: 0 auto">
      <div style="width: 700px; height: 70px; background: #fe99a6">
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 700px;
          "
        >
          <tr>
            <td
              align="center"
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #ffffff;
                font-family: sans-serif;
                font-size: 15px;
                line-height: 38px;
                padding: 20px 0 20px 0;
                text-transform: uppercase;
                letter-spacing: 5px;
              "
            >
              ${status}
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 700px;
          "
        >
          <tr>
            <td
              valign="top"
              style="
                background-color: #efefef;
                border-collapse: collapse;
                border-spacing: 0;
                color: #584660;
                font-family: sans-serif;
                font-size: 30px;
                font-weight: 500;
                line-height: 38px;
                padding: 20px 40px 0px 55px;
              "
            >
              ${result[0].amount}
            </td>
          </tr>
          <tr>
            <td
              valign="top"
              style="
                background-color: #efefef;
                border-collapse: collapse;
                border-spacing: 0;
                color: #bc6277;
                font-family: sans-serif;
                font-size: 17px;
                font-weight: 500;
                line-height: 38px;
                padding: 0px 40px 20px 55px;
              "
            >
              BANK
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 620px;
            background-color: #ffffff;
          "
        >
          <tr>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #bc6277;
                font-family: sans-serif;
                font-size: 15px;
                font-weight: 600;
                line-height: 38px;
                padding: 10px 20px 5px 20px;
              "
            >
              Transaction Details
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
              width: 180px;
            "
          >
            Rejection Reason
          </td>
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
            "
          >
          ${rejected_reason}
          </td>
        </tr>

          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              Trasaction ID
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${result[0].deposit_id}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              DepositFrom
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
              ${result[0].deposited_from}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
              width: 180px;
            "
          >
            Approved At
          </td>
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
            "
          >
            ${approvedAt}
          </td>
        </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
              width: 180px;
            "
          >
            DepositTo
          </td>
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
            "
          >
            ${result[0].deposited_to}
          </td>
        </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              Transaction Date
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
              ${result[0].transaction_date}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              DepositType
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
              BANK
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 670px;
            margin-top: 15px;
            color: #ffffff !important;
            text-decoration: none !important;
          "
        >
          <tr>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 600;
                font-style: italic;
              "
            >
              Please Wait a little while. Your money will be added to your
              wallet after verification is complete.
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 670px;
            background-color: #702c8b;
            margin-top: 25px;
            text-align: center;
            color: #ffffff !important;
            text-decoration: none !important;
          "
        >
          <tr>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                font-family: sans-serif;
                font-size: 16px;
                font-weight: 500;
                padding: 20px 20px 0px 20px;
              "
            >
              Need more help?
            </td>
          </tr>

          <tr>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                font-family: sans-serif;
                font-size: 12px;
                font-weight: 500;
                line-height: 38px;
                padding: 0px 20px 10px 20px;
              "
            >
              Mail us at
              <span style="color: #ffffff !important; text-decoration: none"
                >support@flyfarladies.com</span
              >
              or Call us at +88 01755582111
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="left"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 420px;
            color: #ffffff;
          "
        >
          <tr>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                font-family: sans-serif;
                font-size: 13px;
                font-weight: 600;
                padding: 20px 0px 0px 45px;
                color: #767676;
              "
            >
              <a style="padding-right: 20px; color: #584660" href="http://"
                >Terms & Conditions</a
              >

              <a style="padding-right: 20px; color: #584660" href="http://"
                >Booking Policy</a
              >

              <a style="padding-right: 20px; color: #584660" href="http://"
                >Privacy Policy</a
              >
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            width: 700px;
            color: #ffffff;
            margin-top: 85px;
          "
        >
          <tr>
            <td style="padding-left: 45px">
              <img
                style="padding-right: 5px"
                src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png"
                href="https://www.facebook.com/flyfarladies/?ref=page_internal"
                alt=""
              />
              <img
                style="padding-right: 5px"
                src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png"
                href="https://www.linkedin.com/company/fly-far-ladies/"
                alt=""
              />
              <img
                style="padding-right: 5px"
                src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png"
                href="https://wa.me/+88 01755582111"
                alt=""
              />
            </td>
          </tr>

          <tr>
            <td
              style="
                border-collapse: collapse;
                border-spacing: 0;
                font-family: sans-serif;
                font-size: 13px;
                font-weight: 500;
                padding: 5px 0px 0px 45px;
                color: #767676;
                padding-bottom: 2px;
              "
            >
              Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.
            </td>

            <td
              style="
                border-collapse: collapse;
                border-spacing: 0;
                font-family: sans-serif;
                font-weight: 500;
                color: #767676;
                padding-bottom: 20px;
              "
            >
              <img
                width="100px"
                src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png"
                href="https://www.flyfarladies.com/"
                alt=""
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </body>
</html>
`

    const usermail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: user[0].email, // Recipient's email address
      bcc: 'shornali@flyfarladies.com, ceo@flyfar.org,afridi@flyfar.tech',
      subject: 'Deposit Details',
      text: 'Please find the attached file.',
      html:htmltemplate

    };

    const supportmail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: 'support@flyfarladies.com', // Recipient's email address
      subject: 'Deposit Details',
      text: 'Please find the attached file.',
      html:htmltemplate

    };
    await transporter.sendMail(usermail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
    await transporter.sendMail(supportmail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
    await connection.commit();
    return ksocjocj;
  } catch (error) {
    console.log(error);
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
    const status = "pending"
    const formattedDate = transactionDate.toDateString();
    const remarks = `Cheque Deposit request from ${cheque_number} to ${bank_name} amount of ${amount}deposited on ${formattedDate}`;
    const value = [
      deposit_id,
      cheque_number,
      status,
      bank_name,
      amount,
      image,
      requested_by,
      cheque_date,
      remarks,
      reference,
    ];

    const [results] = await connection.query(
      "INSERT INTO cheque_deposit (deposit_id, cheque_number, status,bank_name, amount, attachment, requested_by, cheque_date,remarks,reference) VALUES (?, ?, ?, ?, ?, ?,?, ?, ?, ?)",
      value
    );

    const transporter = nodemailer.createTransport({
      host: 'b2b.flyfarint.com', // Replace with your email service provider's SMTP host
      port: 465, // Replace with your email service provider's SMTP port
      secure: true, // Use TLS for secure connection
      auth: {
        user: 'flyfarladies@mailservice.center', // Replace with your email address
        pass: 'YVWJCU.?UY^R', // Replace with your email password
      },
    });

    const htmltemplate =`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Deposit Request</title>
      </head>
      <body>
        <div style="width: 700px; height: 110vh; margin: 0 auto">
          <div style="width: 700px; height: 70px; background: #fe99a6">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 700px;
              "
            >
              <tr>
                <td
                  align="center"
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #ffffff;
                    font-family: sans-serif;
                    font-size: 15px;
                    line-height: 38px;
                    padding: 20px 0 20px 0;
                    text-transform: uppercase;
                    letter-spacing: 5px;
                  "
                >
                  Deposit Confirmation
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 700px;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    background-color: #efefef;
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #584660;
                    font-family: sans-serif;
                    font-size: 30px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 20px 40px 0px 55px;
                  "
                >
                  ${amount}
                </td>
              </tr>
              <tr>
                <td
                  valign="top"
                  style="
                    background-color: #efefef;
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #bc6277;
                    font-family: sans-serif;
                    font-size: 17px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 0px 40px 20px 55px;
                  "
                >
                CHEQUE
                </td>
              </tr>
            </table>
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 620px;
                background-color: #ffffff;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #bc6277;
                    font-family: sans-serif;
                    font-size: 15px;
                    font-weight: 600;
                    line-height: 38px;
                    padding: 10px 20px 5px 20px;
                  "
                >
                  Transaction Details
                </td>
              </tr>
    
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                  Transaction ID
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                ${deposit_id}
                </td>
              </tr>

              
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              User Contact
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${user[0]?.phone}
            </td>
          </tr>

          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              User Name
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${user[0]?.name}
            </td>

            
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              User Email
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${user[0]?.email}
            </td>
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                  Bank Name
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                  ${bank_name}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                  width: 180px;
                "
              >
                Cheque Number
              </td>
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                "
              >
                ${cheque_number}
              </td>
            </tr>

            <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              Payment Status
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
              ${status}
            </td>
          </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                  Transaction Date
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                  ${cheque_date}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                  Requested BY
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                  ${requested_by}
                </td>
              </tr>

              <tr style="border-bottom: 1px solid #dfdfdf">
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                  width: 180px;
                "
              >
                Reference
              </td>
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                "
              >
                ${reference}
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #dfdfdf">
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                  width: 180px;
                "
              >
                Requested At
              </td>
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                "
              >
                ${formattedDate}
              </td>
            </tr>

            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 670px;
                margin-top: 15px;
                color: #ffffff !important;
                text-decoration: none !important;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 600;
                    font-style: italic;
                  "
                >
                  Please Wait a little while. Your money will be added to your
                  wallet after verification is complete.
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 670px;
                background-color: #702c8b;
                margin-top: 25px;
                text-align: center;
                color: #ffffff !important;
                text-decoration: none !important;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 16px;
                    font-weight: 500;
                    padding: 20px 20px 0px 20px;
                  "
                >
                  Need more help?
                </td>
              </tr>
    
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 12px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 0px 20px 10px 20px;
                  "
                >
                  Mail us at
                  <span style="color: #ffffff !important; text-decoration: none"
                    >support@flyfarladies.com</span
                  >
                  or Call us at +88 01755582111
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="left"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 420px;
                color: #ffffff;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 13px;
                    font-weight: 600;
                    padding: 20px 0px 0px 45px;
                    color: #767676;
                  "
                >
                  <a style="padding-right: 20px; color: #584660" href="http://"
                    >Terms & Conditions</a
                  >
    
                  <a style="padding-right: 20px; color: #584660" href="http://"
                    >Booking Policy</a
                  >
    
                  <a style="padding-right: 20px; color: #584660" href="http://"
                    >Privacy Policy</a
                  >
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                width: 700px;
                color: #ffffff;
                margin-top: 85px;
              "
            >
              <tr>
                <td style="padding-left: 45px">
                  <img
                    style="padding-right: 5px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png"
                    href="https://www.facebook.com/flyfarladies/?ref=page_internal"
                    alt=""
                  />
                  <img
                    style="padding-right: 5px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png"
                    href="https://www.linkedin.com/company/fly-far-ladies/"
                    alt=""
                  />
                  <img
                    style="padding-right: 5px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png"
                    href="https://wa.me/+88 01755582111"
                    alt=""
                  />
                </td>
              </tr>
    
              <tr>
                <td
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 13px;
                    font-weight: 500;
                    padding: 5px 0px 0px 45px;
                    color: #767676;
                    padding-bottom: 2px;
                  "
                >
                  Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.
                </td>
    
                <td
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-weight: 500;
                    color: #767676;
                    padding-bottom: 20px;
                  "
                >
                  <img
                    width="100px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png"
                    href="https://www.flyfarladies.com/"
                    alt=""
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </body>
    </html>
    `


    const usermail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: user[0].email, // Recipient's email address
      bcc: 'shornali@flyfarladies.com, ceo@flyfar.org,afridi@flyfar.tech',
      subject: 'Deposit Details',
      text: 'Please find the attached file.',
      html:htmltemplate
    };

    const supportmail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: 'support@flyfarladies.com' ,// Recipient's email address
      subject: 'Deposit Details',
      text: 'Please find the attached file.',
      html:htmltemplate
    };
    await transporter.sendMail(usermail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });

    await transporter.sendMail(supportmail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
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

const ApprovedCheckDeposit = async (req) => {
  const connection = await pool.getConnection();
  try {
    const deposit_id = req.params.deposit_id;
    const {action_by } = req.body;
    const updateQuery = `
    UPDATE cheque_deposit
    SET status = ?,
    action_by = ?
    WHERE deposit_id = ?
  `;

  const status = "approved"
    const values = [
      status,
      action_by,
      deposit_id,
    ]; 

    await connection.execute(updateQuery, values);
    const getamount = "SELECT * FROM cheque_deposit WHERE deposit_id = ?";
    await connection.beginTransaction();
    const [result] = await connection.execute(getamount, [deposit_id]);
    const user_id = result[0].requested_by;
    const amount = result[0].amount
    console.log(user_id)

    console.log(amount)
    
    // If the status is 'approved', update  the user wallet
    const updateUserWalletQuery = `UPDATE user SET wallet = wallet + ? WHERE id = ?`;

    const [ksocjocj] = await connection.execute(updateUserWalletQuery, [
      amount,
      user_id,
    ]);

    const date = new Date()
    const options = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'Asia/Dhaka' 
    };

    const approvedAt = date.toLocaleString('en-BD', options);

    const userquery = `SELECT * FROM user WHERE id=?`
    const [user] = await pool.query(userquery, user_id)

    const remarks = `Cheque Deposit request from ${result[0].cheque_number},Reference ${result[0].reference}, On ${result[0].created_at} and  Transaction ID is ${result[0].deposit_id} & amount ${result[0].amount} only.This action had taken by ${action_by}`;

    const ledgerquery = `INSERT INTO ledger(user_id, referenceid, transactionid, transactionType, purchase, lastBalance, actionBy, remarks, createdAt) VALUES (?,?, ?,?,?, ?,?, ?, ?)`;

    const deposit ='Deposit'
    const transcationid = generateTransactionId()
    const ledger = await connection.execute(ledgerquery, [
      result[0].requested_by,
      deposit_id,
      transcationid,
      deposit,
      result[0].amount,
      user[0].wallet,
      action_by,
      remarks,
      approvedAt
    ]);

   // Commit the transaction
     await connection.commit();
    
    const transporter = nodemailer.createTransport({
      host: 'b2b.flyfarint.com', // Replace with your email service provider's SMTP host
      port: 465, // Replace with your email service provider's SMTP port
      secure: true, // Use TLS for secure connection
      auth: {
        user: 'flyfarladies@mailservice.center', // Replace with your email address
        pass: 'YVWJCU.?UY^R', // Replace with your email password
      },
    });



    const htmltemplate = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Deposit Request</title>
      </head>
      <body>
        <div style="width: 700px; height: 110vh; margin: 0 auto">
          <div style="width: 700px; height: 70px; background: #fe99a6">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 700px;
              "
            >
              <tr>
                <td
                  align="center"
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #ffffff;
                    font-family: sans-serif;
                    font-size: 15px;
                    line-height: 38px;
                    padding: 20px 0 20px 0;
                    text-transform: uppercase;
                    letter-spacing: 5px;
                  "
                >
                  ${status}
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 700px;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    background-color: #efefef;
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #584660;
                    font-family: sans-serif;
                    font-size: 30px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 20px 40px 0px 55px;
                  "
                >
                  ${result[0].amount}
                </td>
              </tr>
              <tr>
                <td
                  valign="top"
                  style="
                    background-color: #efefef;
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #bc6277;
                    font-family: sans-serif;
                    font-size: 17px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 0px 40px 20px 55px;
                  "
                >
                  CHEQUE
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 620px;
                background-color: #ffffff;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #bc6277;
                    font-family: sans-serif;
                    font-size: 15px;
                    font-weight: 600;
                    line-height: 38px;
                    padding: 10px 20px 5px 20px;
                  "
                >
                  Transaction Details
                </td>
              </tr>
    
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                  Trasaction ID
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                ${result[0].deposit_id}
                </td>
              </tr>
              
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              User Name
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${user[0]?.name}
            </td>
            
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              User Contact
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${user[0]?.phone}
            </td>

            
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              User Email
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${user[0]?.email}
            </td>
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                cheque_number
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                  ${result[0].cheque_number}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                  width: 180px;
                "
              >
                Approved At
              </td>
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                "
              >
                ${approvedAt}
              </td>
            </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                  width: 180px;
                "
              >
                DepositTo
              </td>
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                "
              >
                ${result[0].bank_name}
              </td>
            </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                  Transaction Date
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                  ${result[0].cheque_date}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                  DepositType
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                    CHEQUE
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 670px;
                margin-top: 15px;
                color: #ffffff !important;
                text-decoration: none !important;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 600;
                    font-style: italic;
                  "
                >
                  Please Wait a little while. Your money will be added to your
                  wallet after verification is complete.
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 670px;
                background-color: #702c8b;
                margin-top: 25px;
                text-align: center;
                color: #ffffff !important;
                text-decoration: none !important;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 16px;
                    font-weight: 500;
                    padding: 20px 20px 0px 20px;
                  "
                >
                  Need more help?
                </td>
              </tr>
    
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 12px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 0px 20px 10px 20px;
                  "
                >
                  Mail us at
                  <span style="color: #ffffff !important; text-decoration: none"
                    >support@flyfarladies.com</span
                  >
                  or Call us at +88 01755582111
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="left"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 420px;
                color: #ffffff;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 13px;
                    font-weight: 600;
                    padding: 20px 0px 0px 45px;
                    color: #767676;
                  "
                >
                  <a style="padding-right: 20px; color: #584660" href="http://"
                    >Terms & Conditions</a
                  >
    
                  <a style="padding-right: 20px; color: #584660" href="http://"
                    >Booking Policy</a
                  >
    
                  <a style="padding-right: 20px; color: #584660" href="http://"
                    >Privacy Policy</a
                  >
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                width: 700px;
                color: #ffffff;
                margin-top: 85px;
              "
            >
              <tr>
                <td style="padding-left: 45px">
                  <img
                    style="padding-right: 5px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png"
                    href="https://www.facebook.com/flyfarladies/?ref=page_internal"
                    alt=""
                  />
                  <img
                    style="padding-right: 5px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png"
                    href="https://www.linkedin.com/company/fly-far-ladies/"
                    alt=""
                  />
                  <img
                    style="padding-right: 5px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png"
                    href="https://wa.me/+88 01755582111"
                    alt=""
                  />
                </td>
              </tr>
    
              <tr>
                <td
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 13px;
                    font-weight: 500;
                    padding: 5px 0px 0px 45px;
                    color: #767676;
                    padding-bottom: 2px;
                  "
                >
                  Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.
                </td>
    
                <td
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-weight: 500;
                    color: #767676;
                    padding-bottom: 20px;
                  "
                >
                  <img
                    width="100px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png"
                    href="https://www.flyfarladies.com/"
                    alt=""
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </body>
    </html>
    `

    const usermail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: user[0].email, // Recipient's email address
      bcc: 'shornali@flyfarladies.com, ceo@flyfar.org,afridi@flyfar.tech',
      subject: 'Deposit Details',
      text: 'Please find the attached file.',
      html:htmltemplate
    };
    

    const supportmail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: 'support@flyfarladies.com' ,// Recipient's email address
      subject: 'Deposit Details',
      text: 'Please find the attached file.',
      html:htmltemplate
    };

    await transporter.sendMail(usermail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });

    await transporter.sendMail(supportmail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
    await connection.commit();
  } catch (error) {
    console.log(error);
    await connection.rollback()
  }
  finally{
    connection.release()
  }
};

const RejectChequeDeposit = async (req) => {
  const connection = await pool.getConnection();
  try {
    const deposit_id = req.params.deposit_id;
    const {action_by, rejected_reason } = req.body;
    const depositQuery = "SELECT * FROM cheque_deposit WHERE deposit_id = ?";
    const [result] = await pool.query(depositQuery, [deposit_id]);
    
    const updateQuery = `
    UPDATE cheque_deposit
    SET status = ?,
    action_by = ?,
    rejected_reason=?
    WHERE deposit_id = ?
  `;

  const status = "rejected"
    const values = [
      status,
      action_by,
      rejected_reason,
      deposit_id,
    ];

    console.log(values)

    const [data] = await pool.query(updateQuery, values)

    const user_id= result[0].requested_by
    const  userquery = `SELECT * FROM user WHERE id =?`
    const [user] = await pool.query(userquery, [user_id])

    const date = new Date()

    const options = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'Asia/Dhaka' 
    };

    const approvedAt = date.toLocaleString('en-BD', options);

    const transporter = nodemailer.createTransport({
      host: 'b2b.flyfarint.com', // Replace with your email service provider's SMTP host
      port: 465, // Replace with your email service provider's SMTP port
      secure: true, // Use TLS for secure connection
      auth: {
        user: 'flyfarladies@mailservice.center', // Replace with your email address
        pass: 'YVWJCU.?UY^R', // Replace with your email password
      },
    });

const htmltemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Deposit Request</title>
  </head>
  <body>
    <div style="width: 700px; height: 110vh; margin: 0 auto">
      <div style="width: 700px; height: 70px; background: #fe99a6">
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 700px;
          "
        >
          <tr>
            <td
              align="center"
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #ffffff;
                font-family: sans-serif;
                font-size: 15px;
                line-height: 38px;
                padding: 20px 0 20px 0;
                text-transform: uppercase;
                letter-spacing: 5px;
              "
            >
              ${status}
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 700px;
          "
        >
          <tr>
            <td
              valign="top"
              style="
                background-color: #efefef;
                border-collapse: collapse;
                border-spacing: 0;
                color: #584660;
                font-family: sans-serif;
                font-size: 30px;
                font-weight: 500;
                line-height: 38px;
                padding: 20px 40px 0px 55px;
              "
            >
              ${result[0].amount}
            </td>
          </tr>
          <tr>
            <td
              valign="top"
              style="
                background-color: #efefef;
                border-collapse: collapse;
                border-spacing: 0;
                color: #bc6277;
                font-family: sans-serif;
                font-size: 17px;
                font-weight: 500;
                line-height: 38px;
                padding: 0px 40px 20px 55px;
              "
            >
              CHEQUE
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 620px;
            background-color: #ffffff;
          "
        >
          <tr>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #bc6277;
                font-family: sans-serif;
                font-size: 15px;
                font-weight: 600;
                line-height: 38px;
                padding: 10px 20px 5px 20px;
              "
            >
              Transaction Details
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
              width: 180px;
            "
          >
            Rejection Reason
          </td>
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
            "
          >
          ${rejected_reason}
          </td>
        </tr>

          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              Trasaction ID
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${result[0].deposit_id}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              Cheque Number
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
              ${result[0].cheque_number}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
              width: 180px;
            "
          >
            Approved At
          </td>
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
            "
          >
            ${approvedAt}
          </td>
        </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
              width: 180px;
            "
          >
            Bank Name
          </td>
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
            "
          >
            ${result[0].bank_name}
          </td>
        </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              Cheque Date 
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
              ${result[0].cheque_date}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              DepositType
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
              CHEQUE
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 670px;
            margin-top: 15px;
            color: #ffffff !important;
            text-decoration: none !important;
          "
        >
          <tr>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 600;
                font-style: italic;
              "
            >
              Please Wait a little while. Your money will be added to your
              wallet after verification is complete.
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 670px;
            background-color: #702c8b;
            margin-top: 25px;
            text-align: center;
            color: #ffffff !important;
            text-decoration: none !important;
          "
        >
          <tr>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                font-family: sans-serif;
                font-size: 16px;
                font-weight: 500;
                padding: 20px 20px 0px 20px;
              "
            >
              Need more help?
            </td>
          </tr>

          <tr>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                font-family: sans-serif;
                font-size: 12px;
                font-weight: 500;
                line-height: 38px;
                padding: 0px 20px 10px 20px;
              "
            >
              Mail us at
              <span style="color: #ffffff !important; text-decoration: none"
                >support@flyfarladies.com</span
              >
              or Call us at +88 01755582111
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="left"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 420px;
            color: #ffffff;
          "
        >
          <tr>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                font-family: sans-serif;
                font-size: 13px;
                font-weight: 600;
                padding: 20px 0px 0px 45px;
                color: #767676;
              "
            >
              <a style="padding-right: 20px; color: #584660" href="http://"
                >Terms & Conditions</a
              >

              <a style="padding-right: 20px; color: #584660" href="http://"
                >Booking Policy</a
              >

              <a style="padding-right: 20px; color: #584660" href="http://"
                >Privacy Policy</a
              >
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            width: 700px;
            color: #ffffff;
            margin-top: 85px;
          "
        >
          <tr>
            <td style="padding-left: 45px">
              <img
                style="padding-right: 5px"
                src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png"
                href="https://www.facebook.com/flyfarladies/?ref=page_internal"
                alt=""
              />
              <img
                style="padding-right: 5px"
                src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png"
                href="https://www.linkedin.com/company/fly-far-ladies/"
                alt=""
              />
              <img
                style="padding-right: 5px"
                src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png"
                href="https://wa.me/+88 01755582111"
                alt=""
              />
            </td>
          </tr>

          <tr>
            <td
              style="
                border-collapse: collapse;
                border-spacing: 0;
                font-family: sans-serif;
                font-size: 13px;
                font-weight: 500;
                padding: 5px 0px 0px 45px;
                color: #767676;
                padding-bottom: 2px;
              "
            >
              Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.
            </td>

            <td
              style="
                border-collapse: collapse;
                border-spacing: 0;
                font-family: sans-serif;
                font-weight: 500;
                color: #767676;
                padding-bottom: 20px;
              "
            >
              <img
                width="100px"
                src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png"
                href="https://www.flyfarladies.com/"
                alt=""
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </body>
</html>
`

    const usermail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: user[0].email, // Recipient's email address
      bcc: 'shornali@flyfarladies.com, ceo@flyfar.org,afridi@flyfar.tech',
      subject: 'Deposit Details',
      text: 'Please find the attached file.',
      html:htmltemplate

    };

    const supportmail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: 'support@flyfarladies.com', // Recipient's email address
      subject: 'Deposit request reject',
      text: 'Please find the attached file.',
      html:htmltemplate

    };
    await transporter.sendMail(usermail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
    await transporter.sendMail(supportmail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
    await connection.commit();
  } catch (error) {
    console.log(error);
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

    if(user[0]?.phone ===''){
      return res.send({message: "please update your phone number" });
    }


    if (amount < 0) {
      throw new Error(
        "Please check your amount. Negative amount not accepted."
      );
    }
    // Generate a UUID-like ID for the bank transfer
    const deposit_id = generateDepoId();
    const gatewayFeePercentage = 1.5; // 1.5%
    const gatewayFee = (amount * gatewayFeePercentage) / 100;
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
        gatewayFee,
        transactionID,
        requested_by,
        amount,
        reference,
        remarks,
        attachment,
      ]
    );

    const date = new Date()
    
    const options = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'Asia/Dhaka' 
    };

    const formattedDate = date.toLocaleString('en-BD', options);
    const transporter = nodemailer.createTransport({
      host: 'b2b.flyfarint.com', // Replace with your email service provider's SMTP host
      port: 465, // Replace with your email service provider's SMTP port
      secure: true, // Use TLS for secure connection
      auth: {
        user: 'flyfarladies@mailservice.center', // Replace with your email address
        pass: 'YVWJCU.?UY^R', // Replace with your email password
      },
    });

    const htmltemplate =`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Deposit Request</title>
      </head>
      <body>
        <div style="width: 700px; height: 110vh; margin: 0 auto">
          <div style="width: 700px; height: 70px; background: #fe99a6">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 700px;
              "
            >
              <tr>
                <td
                  align="center"
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #ffffff;
                    font-family: sans-serif;
                    font-size: 15px;
                    line-height: 38px;
                    padding: 20px 0 20px 0;
                    text-transform: uppercase;
                    letter-spacing: 5px;
                  "
                >
                  Deposit Confirmation
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 700px;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    background-color: #efefef;
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #584660;
                    font-family: sans-serif;
                    font-size: 30px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 20px 40px 0px 55px;
                  "
                >
                  ${amount}
                </td>
              </tr>
              <tr>
                <td
                  valign="top"
                  style="
                    background-color: #efefef;
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #bc6277;
                    font-family: sans-serif;
                    font-size: 17px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 0px 40px 20px 55px;
                  "
                >
                MOBILE BANK
                </td>
              </tr>
            </table>
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 620px;
                background-color: #ffffff;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #bc6277;
                    font-family: sans-serif;
                    font-size: 15px;
                    font-weight: 600;
                    line-height: 38px;
                    padding: 10px 20px 5px 20px;
                  "
                >
                  Transaction Details
                </td>
              </tr>
    
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                  Transaction ID
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                ${deposit_id}
                </td>
              </tr>

              
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              User Contact
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${user[0]?.phone}
            </td>
          </tr>

          
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              User Email
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${user[0]?.email}
            </td>

          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              User Name
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${user[0]?.name}
            </td>
          </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                AccountNumber
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                  ${accountNumber}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                  width: 180px;
                "
              >
              TransactionID
              </td>
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                "
              >
                ${transactionID}
              </td>
            </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                GatewayFee
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                  ${gatewayFee}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                  Requested BY
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                  ${requested_by}
                </td>
              </tr>

              <tr style="border-bottom: 1px solid #dfdfdf">
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                  width: 180px;
                "
              >
                Transaction Date
              </td>
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                "
              >
                ${formattedDate}
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #dfdfdf">
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                  width: 180px;
                "
              >
                Requested At
              </td>
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                "
              >
                ${requestDate}
              </td>
            </tr>

            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 670px;
                margin-top: 15px;
                color: #ffffff !important;
                text-decoration: none !important;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 600;
                    font-style: italic;
                  "
                >
                  Please Wait a little while. Your money will be added to your
                  wallet after verification is complete.
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 670px;
                background-color: #702c8b;
                margin-top: 25px;
                text-align: center;
                color: #ffffff !important;
                text-decoration: none !important;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 16px;
                    font-weight: 500;
                    padding: 20px 20px 0px 20px;
                  "
                >
                  Need more help?
                </td>
              </tr>
    
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 12px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 0px 20px 10px 20px;
                  "
                >
                  Mail us at
                  <span style="color: #ffffff !important; text-decoration: none"
                    >support@flyfarladies.com</span
                  >
                  or Call us at +88 01755582111
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="left"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 420px;
                color: #ffffff;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 13px;
                    font-weight: 600;
                    padding: 20px 0px 0px 45px;
                    color: #767676;
                  "
                >
                  <a style="padding-right: 20px; color: #584660" href="http://"
                    >Terms & Conditions</a
                  >
    
                  <a style="padding-right: 20px; color: #584660" href="http://"
                    >Booking Policy</a
                  >
    
                  <a style="padding-right: 20px; color: #584660" href="http://"
                    >Privacy Policy</a
                  >
                </td>
              </tr>
            </table>
            
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                width: 700px;
                color: #ffffff;
                margin-top: 85px;
              "
            >
              <tr>
                <td style="padding-left: 45px">
                  <img
                    style="padding-right: 5px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png"
                    href="https://www.facebook.com/flyfarladies/?ref=page_internal"
                    alt=""
                  />
                  <img
                    style="padding-right: 5px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png"
                    href="https://www.linkedin.com/company/fly-far-ladies/"
                    alt=""
                  />
                  <img
                    style="padding-right: 5px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png"
                    href="https://wa.me/+88 01755582111"
                    alt=""
                  />
                </td>
              </tr>
    
              <tr>
                <td
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 13px;
                    font-weight: 500;
                    padding: 5px 0px 0px 45px;
                    color: #767676;
                    padding-bottom: 2px;
                  "
                >
                  Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.
                </td>
    
                <td
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-weight: 500;
                    color: #767676;
                    padding-bottom: 20px;
                  "
                >
                  <img
                    width="100px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png"
                    href="https://www.flyfarladies.com/"
                    alt=""
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </body>
    </html>
    `


    const usermail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: user[0].email, // Recipient's email address
      bcc: 'shornali@flyfarladies.com, ceo@flyfar.org,afridi@flyfar.tech',
      subject: 'Deposit Details',
      text: 'Please find the attached file.',
      html:htmltemplate
    };

    const supportmail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: user[0].email, // Recipient's email address
      subject: 'Deposit Details',
      text: 'Please find the attached file.',
      html:htmltemplate
    };
    await transporter.sendMail(usermail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });

    await transporter.sendMail(supportmail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
    
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


const createCashDeposit = async (req) => {
  const connection = await pool.getConnection();
  try {
    const {
      depositor_name,
      receiver_name,
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

    if(user[0]?.phone ===''){
      return res.send({message: "please update your phone number" });
    }

    const image = req.publicImageLink;
    const tableName = "cash_deposit";
    const status = "pending";
    console.log(tableName);
    if (amount < 0) {
      throw new Error(
        "Please check your amount. Negative amount not accepted."
      );
    }
    // Generate a UUID-like ID for the bank transfer
    const deposit_id = generateDepoId();
   const date = new Date();
    // const formattedDate = transactionDate.toDateString();
    const remarks = `Cash Deposit request from ${depositor_name} to ${receiver_name}, On ${formattedDate}.Your TRX ID is ${transaction_id} & amount ${amount} only`;

    console.log(image);
    const value = [
      deposit_id,
      depositor_name,
      receiver_name,
      transaction_date,
      status,
      transaction_id,
      amount,
      requested_by,
      image,
      remarks,
    ];
    const [results] = await connection.query(
      `INSERT INTO ${tableName} ( deposit_id, depositor_name, receiver_name, transaction_date, status, transaction_id, amount, requested_by, attachment,remarks) VALUES (?, ?, ?,?, ?, ?, ?, ?, ?,?)`,
      value
    );


    const options = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'Asia/Dhaka' 
    };

    const formattedDate = date.toLocaleString('en-BD', options);
    const transporter = nodemailer.createTransport({
      host: 'b2b.flyfarint.com', // Replace with your email service provider's SMTP host
      port: 465, // Replace with your email service provider's SMTP port
      secure: true, // Use TLS for secure connection
      auth: {
        user: 'flyfarladies@mailservice.center', // Replace with your email address
        pass: 'YVWJCU.?UY^R', // Replace with your email password
      },
    });

    const htmltemplate =`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Deposit Request</title>
      </head>
      <body>
        <div style="width: 700px; height: 110vh; margin: 0 auto">
          <div style="width: 700px; height: 70px; background: #fe99a6">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 700px;
              "
            >
              <tr>
                <td
                  align="center"
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #ffffff;
                    font-family: sans-serif;
                    font-size: 15px;
                    line-height: 38px;
                    padding: 20px 0 20px 0;
                    text-transform: uppercase;
                    letter-spacing: 5px;
                  "
                >
                  Deposit Confirmation
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 700px;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    background-color: #efefef;
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #584660;
                    font-family: sans-serif;
                    font-size: 30px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 20px 40px 0px 55px;
                  "
                >
                  ${amount}
                </td>
              </tr>
              <tr>
                <td
                  valign="top"
                  style="
                    background-color: #efefef;
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #bc6277;
                    font-family: sans-serif;
                    font-size: 17px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 0px 40px 20px 55px;
                  "
                >
                CASH
                </td>
              </tr>
            </table>
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 620px;
                background-color: #ffffff;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #bc6277;
                    font-family: sans-serif;
                    font-size: 15px;
                    font-weight: 600;
                    line-height: 38px;
                    padding: 10px 20px 5px 20px;
                  "
                >
                  Transaction Details
                </td>
              </tr>
    
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                  Transaction ID
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                ${deposit_id}
                </td>
              </tr>

              
              
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              User Contact
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${user[0]?.phone}
            </td>
          </tr>

          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              User Name
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${user[0]?.name}
            </td>
          </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                  Depositor Name
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                  ${depositor_name
                  }
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                  width: 180px;
                "
              >
                Receiver Name
              </td>
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                "
              >
                ${receiver_name}
              </td>
            </tr>

            <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              Payment Status
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
              ${status}
            </td>
          </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                  Transaction Date
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                  ${transaction_date}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                  Requested BY
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                  ${requested_by}
                </td>
              </tr>

              <tr style="border-bottom: 1px solid #dfdfdf">
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                  width: 180px;
                "
              >
                Transaction Date
              </td>
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                "
              >
                ${transaction_date}
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #dfdfdf">
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                  width: 180px;
                "
              >
                Requested At
              </td>
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                "
              >
                ${formattedDate}
              </td>
            </tr>

            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 670px;
                margin-top: 15px;
                color: #ffffff !important;
                text-decoration: none !important;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 600;
                    font-style: italic;
                  "
                >
                  Please Wait a little while. Your money will be added to your
                  wallet after verification is complete.
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 670px;
                background-color: #702c8b;
                margin-top: 25px;
                text-align: center;
                color: #ffffff !important;
                text-decoration: none !important;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 16px;
                    font-weight: 500;
                    padding: 20px 20px 0px 20px;
                  "
                >
                  Need more help?
                </td>
              </tr>
    
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 12px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 0px 20px 10px 20px;
                  "
                >
                  Mail us at
                  <span style="color: #ffffff !important; text-decoration: none"
                    >support@flyfarladies.com</span
                  >
                  or Call us at +88 01755582111
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="left"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 420px;
                color: #ffffff;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 13px;
                    font-weight: 600;
                    padding: 20px 0px 0px 45px;
                    color: #767676;
                  "
                >
                  <a style="padding-right: 20px; color: #584660" href="http://"
                    >Terms & Conditions</a
                  >
    
                  <a style="padding-right: 20px; color: #584660" href="http://"
                    >Booking Policy</a
                  >
    
                  <a style="padding-right: 20px; color: #584660" href="http://"
                    >Privacy Policy</a
                  >
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                width: 700px;
                color: #ffffff;
                margin-top: 85px;
              "
            >
              <tr>
                <td style="padding-left: 45px">
                  <img
                    style="padding-right: 5px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png"
                    href="https://www.facebook.com/flyfarladies/?ref=page_internal"
                    alt=""
                  />
                  <img
                    style="padding-right: 5px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png"
                    href="https://www.linkedin.com/company/fly-far-ladies/"
                    alt=""
                  />
                  <img
                    style="padding-right: 5px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png"
                    href="https://wa.me/+88 01755582111"
                    alt=""
                  />
                </td>
              </tr>
    
              <tr>
                <td
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 13px;
                    font-weight: 500;
                    padding: 5px 0px 0px 45px;
                    color: #767676;
                    padding-bottom: 2px;
                  "
                >
                  Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.
                </td>
    
                <td
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-weight: 500;
                    color: #767676;
                    padding-bottom: 20px;
                  "
                >
                  <img
                    width="100px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png"
                    href="https://www.flyfarladies.com/"
                    alt=""
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </body>
    </html>
    `


    const usermail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: user[0].email, // Recipient's email address
      bcc: 'shornali@flyfarladies.com, ceo@flyfar.org,afridi@flyfar.tech',
      subject: 'Deposit Details',
      text: 'Please find the attached file.',
      html:htmltemplate
    };

    const supportmail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: user[0].email, // Recipient's email address
      subject: 'Deposit Details',
      text: 'Please find the attached file.',
      html:htmltemplate
    };
    await transporter.sendMail(usermail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });

    await transporter.sendMail(supportmail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
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


const ApprovedCashDeposit = async (req) => {
  const connection = await pool.getConnection();
  try {
    const deposit_id = req.params.deposit_id;
    const {action_by } = req.body;
    const updateQuery = `
    UPDATE cash_deposit
    SET status = ?,
    action_by = ?
    WHERE deposit_id = ?
  `;



   const date = new Date()

    const options = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'Asia/Dhaka' 
    };

    const approvedAt = date.toLocaleString('en-BD', options);

   const status = 'approved'
    const values = [
      status,
      action_by,
      deposit_id
    ];

    const getamount = "SELECT * FROM cash_deposit WHERE deposit_id = ?";
    await connection.beginTransaction();
    const [result] = await connection.execute(getamount, [deposit_id]);
    const  amount = result[0].amount;
    await connection.execute(updateQuery, values);
    // If the status is 'approved', update  the user wallet

    const updateUserWalletQuery = `UPDATE user SET wallet = wallet+ ? WHERE id = ?`;
    const user_id = result[0].requested_by;
    console.log(user_id)

    const [updatewallet] = await connection.execute(updateUserWalletQuery, [
      amount,
      user_id,
    ]);

    const userQuery =`SELECT *  FROM user WHERE id=?`
    const [user] = await  pool.query(userQuery, [user_id])


    const remarks = `Cash Deposit request from ${result[0].depositor_name}, Receiver ${result[0].receiver_name}, On ${result[0].transaction_date} and  TRXID is ${result[0].transaction_id} & amount ${result[0].amount} only.This action had taken by ${action_by}`;

    const ledgerquery = `INSERT INTO ledger(user_id, referenceid, transactionid, transactionType, purchase, lastBalance, actionBy, remarks, createdAt) VALUES (?,?,?,?,?,?, ?, ?, ?)`;

    const deposit ='Deposit'
    const transactionid = generateTransactionId()
    const ledger = await connection.execute(ledgerquery, [
      result[0].requested_by,
      deposit_id,
      transactionid,
      deposit,
      result[0].amount,
      user[0].wallet,
      action_by,
      remarks,
      approvedAt
    ]);


    const transporter = nodemailer.createTransport({
      host: 'b2b.flyfarint.com', // Replace with your email service provider's SMTP host
      port: 465, // Replace with your email service provider's SMTP port
      secure: true, // Use TLS for secure connection
      auth: {
        user: 'flyfarladies@mailservice.center', // Replace with your email address
        pass: 'YVWJCU.?UY^R', // Replace with your email password
      },
    });



    const htmltemplate = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Deposit Request</title>
      </head>
      <body>
        <div style="width: 700px; height: 110vh; margin: 0 auto">
          <div style="width: 700px; height: 70px; background: #fe99a6">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 700px;
              "
            >
              <tr>
                <td
                  align="center"
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #ffffff;
                    font-family: sans-serif;
                    font-size: 15px;
                    line-height: 38px;
                    padding: 20px 0 20px 0;
                    text-transform: uppercase;
                    letter-spacing: 5px;
                  "
                >
                  ${status}
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 700px;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    background-color: #efefef;
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #584660;
                    font-family: sans-serif;
                    font-size: 30px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 20px 40px 0px 55px;
                  "
                >
                  ${result[0].amount}
                </td>
              </tr>
              <tr>
                <td
                  valign="top"
                  style="
                    background-color: #efefef;
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #bc6277;
                    font-family: sans-serif;
                    font-size: 17px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 0px 40px 20px 55px;
                  "
                >
                  CASH
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 620px;
                background-color: #ffffff;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #bc6277;
                    font-family: sans-serif;
                    font-size: 15px;
                    font-weight: 600;
                    line-height: 38px;
                    padding: 10px 20px 5px 20px;
                  "
                >
                  Transaction Details
                </td>
              </tr>
    
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                  Trasaction ID
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                ${result[0].deposit_id}
                </td>
              </tr>

              
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              User Contact
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${user[0]?.phone}
            </td>
          </tr>

          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              User Name
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${user[0]?.name}
            </td>
          </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                Depositor Name
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                  ${result[0].depositor_name}
                </td>
              </tr>

              <tr style="border-bottom: 1px solid #dfdfdf">
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                  width: 180px;
                "
              >
              Receiver Name
              </td>
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                "
              >
                ${result[0].receiver_name}
              </td>
            </tr>

              <tr style="border-bottom: 1px solid #dfdfdf">
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                  width: 180px;
                "
              >
                Approved At
              </td>
              <td
                valign="top"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  color: #767676;
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 38px;
                  padding: 5px 20px;
                "
              >
                ${approvedAt}
              </td>
            </tr>
             
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                  Transaction Date
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                  ${result[0].transaction_date}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #dfdfdf">
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 180px;
                  "
                >
                  DepositType
                </td>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                  "
                >
                    CASH
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 670px;
                margin-top: 15px;
                color: #ffffff !important;
                text-decoration: none !important;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    color: #767676;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 5px 20px;
                    width: 600;
                    font-style: italic;
                  "
                >
                  Please Wait a little while. Your money will be added to your
                  wallet after verification is complete.
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 670px;
                background-color: #702c8b;
                margin-top: 25px;
                text-align: center;
                color: #ffffff !important;
                text-decoration: none !important;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 16px;
                    font-weight: 500;
                    padding: 20px 20px 0px 20px;
                  "
                >
                  Need more help?
                </td>
              </tr>
    
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 12px;
                    font-weight: 500;
                    line-height: 38px;
                    padding: 0px 20px 10px 20px;
                  "
                >
                  Mail us at
                  <span style="color: #ffffff !important; text-decoration: none"
                    >support@flyfarladies.com</span
                  >
                  or Call us at +88 01755582111
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="left"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                padding: 0;
                width: 420px;
                color: #ffffff;
              "
            >
              <tr>
                <td
                  valign="top"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 13px;
                    font-weight: 600;
                    padding: 20px 0px 0px 45px;
                    color: #767676;
                  "
                >
                  <a style="padding-right: 20px; color: #584660" href="http://"
                    >Terms & Conditions</a
                  >
    
                  <a style="padding-right: 20px; color: #584660" href="http://"
                    >Booking Policy</a
                  >
    
                  <a style="padding-right: 20px; color: #584660" href="http://"
                    >Privacy Policy</a
                  >
                </td>
              </tr>
            </table>
    
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                width: 700px;
                color: #ffffff;
                margin-top: 85px;
              "
            >
              <tr>
                <td style="padding-left: 45px">
                  <img
                    style="padding-right: 5px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png"
                    href="https://www.facebook.com/flyfarladies/?ref=page_internal"
                    alt=""
                  />
                  <img
                    style="padding-right: 5px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png"
                    href="https://www.linkedin.com/company/fly-far-ladies/"
                    alt=""
                  />
                  <img
                    style="padding-right: 5px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png"
                    href="https://wa.me/+88 01755582111"
                    alt=""
                  />
                </td>
              </tr>
    
              <tr>
                <td
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-size: 13px;
                    font-weight: 500;
                    padding: 5px 0px 0px 45px;
                    color: #767676;
                    padding-bottom: 2px;
                  "
                >
                  Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.
                </td>
    
                <td
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    font-family: sans-serif;
                    font-weight: 500;
                    color: #767676;
                    padding-bottom: 20px;
                  "
                >
                  <img
                    width="100px"
                    src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png"
                    href="https://www.flyfarladies.com/"
                    alt=""
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </body>
    </html>
    `

    const usermail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: user[0].email, // Recipient's email address
      bcc: 'shornali@flyfarladies.com, ceo@flyfar.org,afridi@flyfar.tech',
      subject: 'Deposit Details',
      text: 'Please find the attached file.',
      html:htmltemplate
    };

    const supportmail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: 'support@flyfarladies.com' ,// Recipient's email address
      subject: 'Deposit Details',
      text: 'Please find the attached file.',
      html:htmltemplate
    };
    await transporter.sendMail(usermail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });

    await transporter.sendMail(supportmail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });

    await connection.commit();

  } catch (error) {
    console.log(error);
  }
};


const RejectCashDeposit = async (req) => {
  const connection = await pool.getConnection();
  try {
    const deposit_id = req.params.deposit_id;
    const {action_by, rejected_reason } = req.body;
    const depositQuery = "SELECT * FROM cash_deposit WHERE deposit_id = ?";
    const [result] = await pool.query(depositQuery, [deposit_id]);
    const updateQuery = `
    UPDATE cheque_deposit
    SET status = ?,
    action_by = ?,
    rejected_reason=?
    WHERE deposit_id = ?
  `;

  const status = "rejected"
    const values = [
      status,
      action_by,
      rejected_reason,
      deposit_id,
    ];

    console.log(values)

    const [data] = await pool.query(updateQuery, values)

    const user_id= result[0].requested_by
    const  userquery = `SELECT * FROM user WHERE id =?`
    const [user] = await pool.query(userquery, [user_id])

    const date = new Date()

    const options = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'Asia/Dhaka' 
    };

    const approvedAt = date.toLocaleString('en-BD', options);

    const transporter = nodemailer.createTransport({
      host: 'b2b.flyfarint.com', // Replace with your email service provider's SMTP host
      port: 465, // Replace with your email service provider's SMTP port
      secure: true, // Use TLS for secure connection
      auth: {
        user: 'flyfarladies@mailservice.center', // Replace with your email address
        pass: 'YVWJCU.?UY^R', // Replace with your email password
      },
    });

const htmltemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Deposit Request</title>
  </head>
  <body>
    <div style="width: 700px; height: 110vh; margin: 0 auto">
      <div style="width: 700px; height: 70px; background: #fe99a6">
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 700px;
          "
        >
          <tr>
            <td
              align="center"
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #ffffff;
                font-family: sans-serif;
                font-size: 15px;
                line-height: 38px;
                padding: 20px 0 20px 0;
                text-transform: uppercase;
                letter-spacing: 5px;
              "
            >
              ${status}
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 700px;
          "
        >
          <tr>
            <td
              valign="top"
              style="
                background-color: #efefef;
                border-collapse: collapse;
                border-spacing: 0;
                color: #584660;
                font-family: sans-serif;
                font-size: 30px;
                font-weight: 500;
                line-height: 38px;
                padding: 20px 40px 0px 55px;
              "
            >
              ${result[0].amount}
            </td>
          </tr>
          <tr>
            <td
              valign="top"
              style="
                background-color: #efefef;
                border-collapse: collapse;
                border-spacing: 0;
                color: #bc6277;
                font-family: sans-serif;
                font-size: 17px;
                font-weight: 500;
                line-height: 38px;
                padding: 0px 40px 20px 55px;
              "
            >
              CASH
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 620px;
            background-color: #ffffff;
          "
        >
          <tr>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #bc6277;
                font-family: sans-serif;
                font-size: 15px;
                font-weight: 600;
                line-height: 38px;
                padding: 10px 20px 5px 20px;
              "
            >
              Transaction Details
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
              width: 180px;
            "
          >
            Rejection Reason
          </td>
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
            "
          >
          ${rejected_reason}
          </td>
        </tr>

          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              Trasaction ID
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
            ${result[0].deposit_id}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
            Depositor Name
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
              ${result[0].depositor_name}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
              width: 180px;
            "
          >
            Rejected At
          </td>
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
            "
          >
            ${approvedAt}
          </td>
        </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
              width: 180px;
            "
          >
          receiver_name
          </td>
          <td
            valign="top"
            style="
              border-collapse: collapse;
              border-spacing: 0;
              color: #767676;
              font-family: sans-serif;
              font-size: 14px;
              font-weight: 500;
              line-height: 38px;
              padding: 5px 20px;
            "
          >
            ${result[0].receiver_name}
          </td>
        </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
            transaction_date
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
              ${result[0].transaction_date}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #dfdfdf">
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 180px;
              "
            >
              DepositType
            </td>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
              "
            >
              CASH
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 670px;
            margin-top: 15px;
            color: #ffffff !important;
            text-decoration: none !important;
          "
        >
          <tr>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                color: #767676;
                font-family: sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 38px;
                padding: 5px 20px;
                width: 600;
                font-style: italic;
              "
            >
              Please Wait a little while. Your money will be added to your
              wallet after verification is complete.
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 670px;
            background-color: #702c8b;
            margin-top: 25px;
            text-align: center;
            color: #ffffff !important;
            text-decoration: none !important;
          "
        >
          <tr>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                font-family: sans-serif;
                font-size: 16px;
                font-weight: 500;
                padding: 20px 20px 0px 20px;
              "
            >
              Need more help?
            </td>
          </tr>

          <tr>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                font-family: sans-serif;
                font-size: 12px;
                font-weight: 500;
                line-height: 38px;
                padding: 0px 20px 10px 20px;
              "
            >
              Mail us at
              <span style="color: #ffffff !important; text-decoration: none"
                >support@flyfarladies.com</span
              >
              or Call us at +88 01755582111
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="left"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0;
            width: 420px;
            color: #ffffff;
          "
        >
          <tr>
            <td
              valign="top"
              style="
                border-collapse: collapse;
                border-spacing: 0;
                font-family: sans-serif;
                font-size: 13px;
                font-weight: 600;
                padding: 20px 0px 0px 45px;
                color: #767676;
              "
            >
              <a style="padding-right: 20px; color: #584660" href="http://"
                >Terms & Conditions</a
              >

              <a style="padding-right: 20px; color: #584660" href="http://"
                >Booking Policy</a
              >

              <a style="padding-right: 20px; color: #584660" href="http://"
                >Privacy Policy</a
              >
            </td>
          </tr>
        </table>

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          style="
            border-collapse: collapse;
            border-spacing: 0;
            width: 700px;
            color: #ffffff;
            margin-top: 85px;
          "
        >
          <tr>
            <td style="padding-left: 45px">
              <img
                style="padding-right: 5px"
                src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png"
                href="https://www.facebook.com/flyfarladies/?ref=page_internal"
                alt=""
              />
              <img
                style="padding-right: 5px"
                src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png"
                href="https://www.linkedin.com/company/fly-far-ladies/"
                alt=""
              />
              <img
                style="padding-right: 5px"
                src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png"
                href="https://wa.me/+88 01755582111"
                alt=""
              />
            </td>
          </tr>

          <tr>
            <td
              style="
                border-collapse: collapse;
                border-spacing: 0;
                font-family: sans-serif;
                font-size: 13px;
                font-weight: 500;
                padding: 5px 0px 0px 45px;
                color: #767676;
                padding-bottom: 2px;
              "
            >
              Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.
            </td>

            <td
              style="
                border-collapse: collapse;
                border-spacing: 0;
                font-family: sans-serif;
                font-weight: 500;
                color: #767676;
                padding-bottom: 20px;
              "
            >
              <img
                width="100px"
                src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png"
                href="https://www.flyfarladies.com/"
                alt=""
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </body>
</html>
`

    const usermail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: user[0].email, // Recipient's email address
      subject: 'Deposit Details',
      text: 'Please find the attached file.',
      html:htmltemplate

    };

    const supportmail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: 'support@flyfarladies.com', // Recipient's email address
      subject: 'Deposit request reject',
      text: 'Please find the attached file.',
      html:htmltemplate

    };
    await transporter.sendMail(usermail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
    await transporter.sendMail(supportmail, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
    await connection.commit();
  } catch (error) {
    console.log(error);
  }
};


const getuserdeposit = async (req, res) => {
  try {
    const userid = req.params.requested_by;
    const bankDepoQuery = `SELECT *, created_at as date FROM bank_transfer WHERE requested_by = ? ORDER BY created_at DESC`;
    const [bankDeposit] = await pool.query(bankDepoQuery, [userid]);

    const cheqDepoQuery = `SELECT *, created_at as date FROM cheque_deposit WHERE requested_by = ? ORDER BY created_at DESC`;
    const [chequeDeposit] = await pool.query(cheqDepoQuery, [userid]);

    const mobileBankDepoQuery = `SELECT *, requestDate as date FROM mobilebank WHERE requested_by = ? ORDER BY requestDate DESC`;
    const [mobileDeposit] = await pool.query(mobileBankDepoQuery, [userid]);

    const bkashDeposit = `SELECT *, paymentExecuteTime as date FROM bkaspayment WHERE userid = ? ORDER BY paymentExecuteTime DESC`;
    const [bkashdata] = await pool.query(bkashDeposit, [userid]);

    const combinedResult = [...bankDeposit, ...chequeDeposit, ...mobileDeposit, ...bkashdata];

    // Sort the combined results by date in descending order
    combinedResult.sort((a, b) => new Date(b.date) - new Date(a.date));

    return res.json({ alldeposit: combinedResult });
  } catch (error) {
    console.error("Error fetching user deposits:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAlldeposit = async (req, res) => {
  try {
    // Fetch deposits from different tables
    const bankDepoQuery = `SELECT *, created_at as date FROM bank_transfer ORDER BY created_at DESC`;
    const [bankDeposit] = await pool.query(bankDepoQuery);

    const cheqDepoQuery = `SELECT *, created_at as date FROM cheque_deposit ORDER BY created_at DESC`;
    const [chequeDeposit] = await pool.query(cheqDepoQuery);

    const mobileBankDepoQuery = `SELECT *, created_at as date FROM mobilebank ORDER BY created_at DESC`;
    const [mobileDeposit] = await pool.query(mobileBankDepoQuery);

    const bkashDeposit = `SELECT *, paymentExecuteTime as date FROM bkaspayment ORDER BY paymentExecuteTime DESC`;
    const [bkashdata] = await pool.query(bkashDeposit);

    // Combine all deposits into a single array
    const combinedResult = [
      ...bankDeposit.map(deposit => ({ ...deposit, source: 'bank_transfer' })),
      ...chequeDeposit.map(deposit => ({ ...deposit, source: 'cheque_deposit' })),
      ...mobileDeposit.map(deposit => ({ ...deposit, source: 'mobilebank' })),
      ...bkashdata.map(deposit => ({ ...deposit, source: 'bkaspayment' })),
    ];

    // Sort the combined result by date in descending order
    combinedResult.sort((a, b) => new Date(b.date) - new Date(a.date));

    return res.json({ alldeposit: combinedResult });
  } catch (error) {
    console.error("Error fetching user deposits:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const depositeService = {
  createBankDeposit,
  ApprovedBankDeposit,
  RejectBankDeposit,
  createCheckDeposit,
  createCashDeposit,
  ApprovedCheckDeposit,
  RejectChequeDeposit,
  createMobilebank,
  ApprovedCashDeposit,
  RejectCashDeposit,
  getAlldeposit,
  getuserdeposit,
};
