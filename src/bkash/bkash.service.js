import axios from "axios";
import { any } from "zod";

import { createHash } from "crypto";
import { createPayment, executePayment, queryPayment, searchTransaction, refundTransaction } from "bkash-payment";
import pool from "../database/db";
import moment from "moment/moment";


 const generateCustomTransactionId =  async () =>  {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substr(2, 6); // Generate a random alphanumeric string
  const hash = createHash('sha256').update(`TX${timestamp}${randomString}`).digest('hex');
  const shortenedHash = hash.substr(0, 16).toUpperCase();
  return shortenedHash;
}


 const generateCustomorderId = async () =>  {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substr(2, 6); // Generate a random alphanumeric string
  const hash = createHash('sha256').update(`OI${timestamp}${randomString}`).digest('hex');
  const shortenedHash = hash.substr(0, 12).toUpperCase();
  return shortenedHash;
}

export function getFormatDateTimeWithSpace(date) {
  return moment(date, 'YYYY-MM-DDTHH:mm:ss:SSS [GMT]Z').format('YYYY-MM-DD HH:mm:ss');
}

const bkashConfig = {
  base_url : 'https://tokenized.pay.bka.sh/v1.2.0-beta',
  username: '01755572096',
  password: '(4G&85PThG!',
  app_key: 'qsva78y6yL4wvTBKVkllhuditc',
  app_secret: 'fzEl2yrbGpQOQ5UdS50hWADPUWgyccRdh24fJKuVaiuynJGBODpS'
 }

const generateToken = async(req, res) =>{
  try {
    const headers ={
      username: "sandboxTokenizedUser02",
      password: "sandboxTokenizedUser02@12345",
      "Content-Type":"application/json",
      accept: 'application/json'
    };

    const url =`https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant`

    const data = {
      app_key:  '4f6o0cjiki2rfm34kfdadl1eqq',
      app_secret: '2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b',
    }
    const response = await axios.post(url, data, {headers});
    if (response.data.status === 'fail') {
      throw new Error('Invalid API Credentials Provided');
    }

    return response.data.id_token
  } catch (error) {
    throw new Error('An error occurred while fetching the token');
  }
}

const CreatePayment = async(req,res) =>{

  try {

    const id = await generateCustomorderId()
    const { amount, callbackURL, reference } = req.body
    const paymentDetails = {
      amount: amount || 20,                                                 // your product price
      callbackURL : callbackURL || 'http://localhost:4004/api/v1/bkash/callback',  // your callback route
      orderID : id || 'Order_101',                                     // your orderID
      reference : reference || '1'                                          // your reference
    }
    console.log(paymentDetails);
    const result =  await createPayment(bkashConfig, paymentDetails)
    res.send(result)
  } catch (e) {
    console.log(e)
  }

}


  const callback  = async (req,res )=>{
    try {
      const { status, paymentID } = req.query
      console.log(paymentID)
      // let result
      // let response = {
      //   statusCode : '4000',
      //   statusMessage : 'Payment Failed'
      // }
      if(status === 'success') {
       const result =  await executePayment(bkashConfig, paymentID)
        if(result?.transactionStatus === 'Completed' && result.statusCode === '0000'){
          console.log("payment success")
          const insertQuery = `
          INSERT INTO bkaspayment (paymentID, trxID, transactionStatus, amount, currency, paymentExecuteTime, merchantInvoiceNumber, payerReference, customerMsisdn, statusCode, statusMessage) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const datetime =  getFormatDateTimeWithSpace(result.paymentExecuteTime)
        console.log(datetime);
      
        const insertParams = [
          result.paymentID,
          result.trxID,
          result.transactionStatus,
          result.amount,
          result.currency,
          datetime,
          result.merchantInvoiceNumber,
          result.payerReference,
          result.customerMsisdn,
          result.statusCode,
          result.statusMessage
        ];
  
        console.log(insertParams)
        // Execute the insertion query
        await pool.query(insertQuery, insertParams);
        }
        console.log(result)
        // You may use here WebSocket, server-sent events, or other methods to notify your client
        return res.redirect(`https://flyfarladies.com?message=${result.statusMessage}&status=${status}`);

      } 
      else if (status === 'cancel') {
        const message = 'Payment has been cancelled';
        return res.redirect(`https://flyfarladies.com?message=${encodeURIComponent(message)}&status=${status}`);
      }
    //  else if (status === 'failure') {
    //     const message = 'Payment has been failure';
    //     return res.redirect(`https://flyfarladies.com?message=${encodeURIComponent(message)}&status=${status}`);
    //   }
      
   
    } catch (e) {
      console.log(e)
    }
  }


  const getTransaction = async(req,res)=>{
    try {
      const { trxID } = req.query
      const result = await searchTransaction(bkashConfig, trxID)
      res.send(result)
    } catch (e) {
      console.log(e)
    }

  }

const QueryPayment  = async (req,res)=>{
  try {
    const { paymentID } = req.query
    const result = await queryPayment(bkashConfig, paymentID)
    res.send(result)
  } catch (e) {
    console.log(e)
  }

}

const refundAmount = async(req,res) =>{
  try {
    // Extract required data from request body
    const { paymentID, amount, trxID, sku, reason } = req.body;

    // Request body
    const refundDetails = {
      paymentID,
      amount,
      trxID,
      sku,
      reason,
    };

    // Make HTTP request
    const result = await refundTransaction(bkashConfig, refundDetails)
    if(result.statusMessage === "Successful"  && result.statusCode === "0000"){
      const updatequery = `UPDATE bkaspayment SET refundTrxID =?, isRefundable =? WHERE trxID=?`
      const isRefundable = true
      const values =[
        result.refundTrxID,
        isRefundable,
        trxID
      ]
      await pool.query(updatequery, values)
    }
   return res.send(result)

    // Send response data back to the client
  } catch (error) {
    console.error('Error creating refund:', error);
    res.status(500).json({ error: 'An error occurred while processing the refund.' });
  }

}

export const bkashService = {
  generateToken,
  CreatePayment,
  callback,
  getTransaction,
  QueryPayment,
  refundAmount
}