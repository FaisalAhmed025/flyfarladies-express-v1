import axios from "axios";
import { any } from "zod";

import { createHash } from "crypto";


 const generateCustomTransactionId =  async () =>  {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substr(2, 6); // Generate a random alphanumeric string
  const hash = createHash('sha256').update(`TX${timestamp}${randomString}`).digest('hex');
  const shortenedHash = hash.substr(0, 16).toUpperCase();
  return shortenedHash;
}

 const generateCustomorderId  =async () =>  {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substr(2, 6); // Generate a random alphanumeric string
  const hash = createHash('sha256').update(`OI${timestamp}${randomString}`).digest('hex');
  const shortenedHash = hash.substr(0, 12).toUpperCase();
  return shortenedHash;
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


const  createPayment  = async (req,res) =>{
  try {
    const token = await generateToken();
    const endpoint = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create'; // Replace with your actual base URL
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token,
      'X-APP-Key': '4f6o0cjiki2rfm34kfdadl1eqq',
    };

    const { amount, currency } = req.body;

    if (parseFloat(amount) < 1) {
      return res.status(400).json({ status: 'error', message: 'Minimum amount at least 1 TK' });
    }

    const id = await generateCustomTransactionId()
    const requestData = {
      mode: '0000',
      payerReference:  '01877722345',
      callbackURL: 'http://localhost:4004/api/v1/bkash/callback',
      amount: amount || '10',
      currency: currency || 'BDT',
      intent: 'sale',
      merchantInvoiceNumber:  id,
    };
    console.log(requestData)

    const response = await axios.post(endpoint, JSON.stringify(requestData), { headers });
    if (response.status === 200) {
      return res.json(response.data);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

}

const  executepayment = async (paymentID, res)=>{
  try {
    // const { paymentID } = req.body;
    const token = await generateToken();
    const endpoint = 'https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout/execute'; // Replace with your actual base URL
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token,
      'X-APP-Key': '4f6o0cjiki2rfm34kfdadl1eqq',
    };
    const body = {
      paymentID
    };

    console.log(paymentID)

    const response = await axios.post(endpoint, body, { headers });
    console.log(response.data);
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }

}


  const callback  = async (req,res )=>{
    const { paymentID, status } = req.query;
    console.log('Payment ID:', paymentID);
    console.log('Status:', status);
    try {
      if (status === 'success') {
        const responsedata = await executepayment(paymentID);
        console.log(responsedata)
        if (responsedata.statusCode === '0000' && responsedata.agreementStatus === 'Completed') {
          const { amount, trxID, customerMsisdn, merchantInvoiceNumber, paymentExecuteTime, currency, statusMessage } = responsedata;
          // Save the response data in database
          // const instantdeposit = new Bankdeposit({
          //   status: 'APPROVED',
          //   transactionid: trxID, // Using paymentID as transactionid
          //   amount: parseFloat(amount),
          //   paymentID,
          //   status: transactionStatus,
          //   customerMsisdn,
          //   currency,
          //   transactiondate: paymentExecuteTime,
          //   merchantInvoiceNumber
          // });
          // await instantdeposit.save();
          // await GeneralLedger.save(instantdeposit);
          // Redirect to front end
          console.log('Payment Successfully Processed and Saved!');
          return res.redirect(`https://flyfarladies.com?message=${statusMessage}&status=${status}`);
        } else {
          const message = responsedata.statusMessage;
          const status = 'fail';
          return res.redirect(`https://flyfarladies.com?message=${encodeURIComponent(message)}&status=${encodeURIComponent(status)}`);
        }
      } else if (status === 'cancel') {
        const message = 'Payment has been cancelled';
        return res.redirect(`https://flyfarladies.com?message=${encodeURIComponent(message)}&status=${status}`);
      } else if (status === 'failure') {
        const message = 'Payment has been failure';
        return res.redirect(`https://flyfarladies.com?message=${encodeURIComponent(message)}&status=${status}`);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle the error appropriately
      return res.status(500).json({ error: 'An error occurred while processing the payment.' });
    }
  }



const QueryPayment  = async (req,res)=>{
  const { paymentID } = req.params; // Extract paymentID from URL parameters
  try {
    const token = await generateToken(); // Assuming you have the createtoken function defined somewhere

    const endpoint = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/payment/status'; // Replace with your actual base URL
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token,
      'X-APP-Key': '4f6o0cjiki2rfm34kfdadl1eqq',
    };
    const body = {
      paymentID
    };

    const response = await axios.post(endpoint, body, { headers });

    if (response.status === 200) {
      return res.json(response.data);
    }
  } catch (error) {
    console.error('Error querying payment status:', error);
    return res.status(500).json({ error: 'An error occurred while querying payment status.' });
  }
}

const refundAmount = async(req,res) =>{

  try {
    const url = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/payment/refund'; // Replace with your actual base URL

    // Call the create token function for token
    const token = await generateToken(); // Assuming you have the createtoken function defined somewhere

    // Headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token,
      'X-APP-Key': '4f6o0cjiki2rfm34kfdadl1eqq',
    };

    // Extract required data from request body
    const { paymentID, amount, trxID, sku, reason } = req.body;

    // Request body
    const body = {
      paymentID,
      amount,
      trxID,
      sku,
      reason,
    };

    // Make HTTP request
    const response = await axios.post(url, body, { headers });

    // Send response data back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error creating refund:', error);
    res.status(500).json({ error: 'An error occurred while processing the refund.' });
  }

}

export const bkashService = {
  generateToken,
  createPayment,
  callback,
  executepayment,
  QueryPayment,
  refundAmount
}