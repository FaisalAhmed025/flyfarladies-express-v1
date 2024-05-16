
import SSLCommerzPayment from 'sslcommerz-lts';
import { createHash } from 'crypto';
import pool from '../database/db';


const generateCustomTransactionId = ()=> {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substr(2,6); // Generate a random alphanumeric string
  const hash = createHash('sha256').update(`${timestamp}${randomString}`).digest('hex');
  const shortenedHash = hash.substr(0, 16).toUpperCase();
  return shortenedHash;
}


const initpayment = async(req,res) =>{
  const transactionId = generateCustomTransactionId();
  const userid  = req.params.id
  const userquery =  `SELECT * FROM user WHERE id=?`
  const [user] = await pool.query(userquery, [userid]);


  const data = {
    store_id: process.env.SSL_STORE_ID,
    store_passwd: process.env.SSL_STORE_PASSWORD,
    total_amount: req.body.amount,
    currency: "BDT",
    tran_id: transactionId,
    tran_date: Date(),
    success_url: `https://flyfarladies-express-416405.de.r.appspot.com/api/v1/ssl/success/${transactionId}`,
    fail_url: `https://flyfarladies-express-416405.de.r.appspot.com/api/v1/ssl/failure/${transactionId}`,
    cancel_url: `https://flyfarladies-express-416405.de.r.appspot.com/api/v1/ssl/cancel/${transactionId}`,
    emi_option: 0,
    cus_name: user[0].name,
    cus_email:  user[0].email,
    cus_phone:  user[0].phone,
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    shipping_method: "NO",
    product_name: "Sample Product",
    product_category: "Sample Category",
    product_profile: "general",
    value_a: "scfcc" || user.uuid,
  }


  const insertQuery = `INSERT INTO ssl_commerz_entity (
    tran_id,
    value_b,
    cus_name, cus_email, cus_phone,
    total_amount, currency, status
) VALUES (
    ?, ?, ?, ?, ?, ?,
    ?, ?
)
`
const paymentstatus = "unpaid"
    // Execute the SQL query
    await pool.query(insertQuery, [
      transactionId,
      userid,
      data.cus_name,
      data.cus_email,
      data.cus_phone,
      data.total_amount,
      data.currency,
      paymentstatus
    
    ]);

 
  console.log(data)
    const sslcz = new SSLCommerzPayment(process.env.SSL_STORE_ID, process.env.SSL_STORE_PASSWORD, false);
    const apiResponse = await sslcz.init(data);
    // await this.sslcommerzRepository.save(data)
    res.send(apiResponse)
 
}

const sucesss  = async (req,res)=>{

    const tran_id = req.params.tran_id;
    // const uuid = req.params.id;
    const data = req.body;
    console.log(req.body)

    // Assuming you have a sslcommerzRepository and UserRepository to handle database operations
    const [transactionRows] = await pool.query('SELECT * FROM ssl_commerz_entity WHERE tran_id = ?', [tran_id]);
    const transaction = transactionRows[0];
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction ID not found', error: true });
    }
    await pool.query('UPDATE ssl_commerz_entity SET paymentstatus = ?, store_amount = ?,  status =?, tran_date = ?, val_id = ?, bank_tran_id = ? WHERE tran_id = ?', ['VALIDATED', data.store_amount,  data.status, data.tran_date, data.val_id, data.bank_tran_id, tran_id]);
    return res.status(200).json({
      status: 'success',
      message: 'Payment success',
    });
  } 

  const validatepayment = async(req,res)=>{
    const val_id = req.params.val_id
    const data = {
      val_id: val_id
    }
    const sslcz = new SSLCommerzPayment(process.env.SSL_STORE_ID, process.env.SSL_STORE_PASSWORD, false);
    const validationData = await sslcz.validate(data);
    return res.send (validationData);
  }

  const refundInitiate  = async(req,res )=>{
    const  {refund_amount, refund_remarks, bank_tran_id, refe_id} = req.body

    const data = {
      refund_amount: refund_amount,
      refund_remarks: refund_remarks,
      bank_tran_id: bank_tran_id,
      refe_id: refe_id,
    };

    const sslcz = new SSLCommerzPayment(process.env.SSL_STORE_ID, process.env.SSL_STORE_PASSWORD, false);

    const apiresponse = await sslcz.initiateRefund(data);
    return res.send(apiresponse)

  }


  const refundQuery = async(req,res)=>{
    const refund_ref_id = req.params.refund_ref_id
    const data = {
      refund_ref_id:refund_ref_id,
  };

  const sslcz = new SSLCommerzPayment(process.env.SSL_STORE_ID, process.env.SSL_STORE_PASSWORD, false);
  sslcz.refundQuery(data).then(data => {
      //process the response that got from sslcommerz
      //https://developer.sslcommerz.com/doc/v4/#initiate-the-refund
      return res.send(data) ;
  });
  }

  const transactionStatus = async(req,res) =>{
    const tran_id= req.params.tran_id
    const data = {
      tran_id:tran_id,
  };
  const sslcz = new SSLCommerzPayment(process.env.SSL_STORE_ID, process.env.SSL_STORE_PASSWORD, false);
  sslcz.transactionQueryByTransactionId(data).then(data => {
      //process the response that got from sslcommerz
      //https://developer.sslcommerz.com/doc/v4/#by-session-id
      return res.send(data)
  });
  }
  




export const sslpaymentService = {
  initpayment,
  sucesss,
  validatepayment,
  refundInitiate,
  refundQuery,
  transactionStatus
}
