import httpStatus from "http-status"
import pool from "../database/db"
import { bookingStatus } from "../booking/bookingservice"
import { HttpException, NotFoundException } from "express-sharp"
import { createHash } from 'crypto';
import SSLCommerzPayment from 'sslcommerz-lts';

export const payementStatus ={
  PAID: 'paid',
  UNPAID: 'unpaid',
  BOOKINGSTATUS: 'bookingamount paid',
  FIRSTINSTALLMENT:'first installment paid',
  SECONDINSTALLMENT: 'second installment paid'
}

export const installmentStatus = {
  COMPLETED: 'completed',
  INCOMPLETED: 'incompleted'
}


const generateCustomTransactionId = ()=> {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substr(2,6); // Generate a random alphanumeric string
  const hash = createHash('sha256').update(`${timestamp}${randomString}`).digest('hex');
  const shortenedHash = hash.substr(0, 16).toUpperCase();
  return shortenedHash;
}


const paywithwallet = async(req,res)=>{
try {
  const  userid = req.body.id
  const bookingid = req.body.bookingid
  const  bookingquery =  `SELECT * FROM booking WHERE bookingid=?`

  const [booking] = await pool.query(bookingquery, [bookingid])

  if (!booking || booking.length === 0) {
    throw new NotFoundException('Booking not found');
  }

  if (booking[0].bookingStatus !== 'hold') {
    throw new NotFoundException('Booking request already approved or Rejected');
  }
  const userquery =  `SELECT * FROM user WHERE id = ?`

  const [user] = await pool.query(userquery, [userid]);

  if (!user || user.length === 0) {
    throw new NotFoundException('User not found');
  }

  const totalprice = booking[0].totalAmount;
  console.log(user[0].wallet)

  const data = parseInt(totalprice)

  const wallet = parseInt(user[0].wallet)

    // Check wallet balance
    if (wallet < data) {
      throw new HttpException('Insufficient balance! please deposit to your wallet', httpStatus.BAD_REQUEST);
    }
    
    const newWalletBalance = user[0].wallet - totalprice;

    const walletvalue = [
      newWalletBalance,
      userid
    ]
    const updateuserbalancequery =`UPDATE user SET wallet = ? WHERE id = ?`
    await pool.query(updateuserbalancequery,walletvalue);


    const bookingstatus = bookingStatus.CONFIRMED
    const paymentstatus = payementStatus.PAID

    console.log(bookingStatus)

    const value = [
      bookingstatus,
      paymentstatus,
      user[0].wallet,
      bookingid
    ]

    const updatebookingquery = `UPDATE booking SET bookingStatus = ?, paymentStatus = ?, wallet = ? WHERE bookingid = ?`

    const [updatedBooking] = await pool.query(updatebookingquery, value)

    // const depositby = `${user[0].name}`;
    // const status = 'purchase'

    // const ledgervalue = [
    //   userid,
    //   depositby,
    //   paymentstatus,
    //   totalprice,
    //   bookingid,
    //   status
    // ]

    // const insertledger = 'INSERT INTO ledger (userID, depositby, paymentStatus, amount, bookingrefId, Date, status) VALUES (?, ?, ?, ?, ?, NOW(), ?)'
    // await pool.query (insertledger, ledgervalue)
  
} catch (error) {
  console.error("Error making payment with wallet:", error);
  throw error;
  
}





}


const paybookingamount = async (req,res) =>{
  const bookingid = req.body.bookingid
  const userid = req.body.id
  const packagequery = `SELECT *  FROM booking WHERE bookingid =?`
  const [booking] = await pool.query(packagequery, [bookingid])

  if (!booking || booking.length === 0) {
    throw new NotFoundException('Booking not found');
  }

  if (booking[0].bookingStatus !== 'hold') {
    throw new NotFoundException('Booking request already approved or Rejected');
  }
  const userquery =  `SELECT * FROM user WHERE id = ?`

  const [user] = await pool.query(userquery, [userid]);

  if (!user || user.length === 0) {
    throw new NotFoundException('User not found');
  }
  const bookingamount = booking[0].booking_money;
  console.log(user[0].wallet);
  console.log(bookingamount);

  const currentDate = new Date(); // Use JavaScript Date objects
  const dueDate = booking.booking_money_due_date;
  if (currentDate > dueDate) {
    throw new HttpException(
      'The due date for the installment has passed please contact with us',
      httpStatus.BAD_REQUEST,
    );
  }

    // Check wallet balance
    console.log(parseInt(user[0].wallet))
    console.log(parseInt(bookingamount))
    if (parseInt(user[0].wallet) < parseInt(bookingamount)) {
    throw new HttpException('Insufficient balance! please deposit to your wallet', httpStatus.BAD_REQUEST);
  }

 
   const updatedwalet =  user[0].wallet - bookingamount
   console.log(updatedwalet);

   const value =[
    updatedwalet,
    userid
   ]

  const  updatequery = `UPDATE user SET wallet = ? WHERE id =? `
  await pool.query(updatequery, value)

  const paymentstatus  = payementStatus.BOOKINGSTATUS
  const bookingamountstatus = installmentStatus.COMPLETED
  const lastbalance = user[0].wallet
  const bookingamountpaiddate = new Date()


  const valuedata =  [
    paymentstatus,
    bookingamountstatus,
    bookingamountpaiddate,
    lastbalance,
    bookingid
  ]
  const updateBookingquery = `UPDATE booking SET paymentStatus = ?, bookingAmountStatus = ? ,bookingamountpaiddate =?,  wallet = ? WHERE bookingid= ? `
  const [updatebooing] =  await pool.query(updateBookingquery,valuedata)
  return updatebooing;
}



const payFirstandSecondInstallment = async (req,res) =>{
  const bookingid = req.body.bookingid
  const userid = req.body.id
  const bookingquery = `SELECT * FROM booking WHERE bookingid = ?`
  const [booking] = await pool.query(bookingquery, [bookingid])

  if (!booking || booking.length === 0) {
    throw new NotFoundException('Booking not found');
  }

  if (booking[0].bookingStatus !== 'hold') {
    throw new NotFoundException('Booking request already approved or Rejected');
  }
  const userquery =  `SELECT * FROM user WHERE id = ?`

  const [user] = await pool.query(userquery, [userid]);

  if (!user || user.length === 0) {
    throw new NotFoundException('User not found');
  }

  const bookingamount = booking[0].booking_money;
  const firstinstalmentAmount =  booking[0].firstinstalmentAmount
  const  totalAmount = bookingamount + firstinstalmentAmount
    if (parseInt(user[0].wallet) < parseInt(totalAmount)) {
    throw new HttpException('Insufficient balance! please deposit to your wallet', httpStatus.BAD_REQUEST);
  }

 
   const updatedwalet =  parseInt(user[0].wallet) - parseInt(totalAmount)
   console.log(updatedwalet);

   const value =[
    updatedwalet,
    userid
   ]

   const  updatequery = `UPDATE user SET wallet = ? WHERE id = ? `
   await pool.query(updatequery, value)


  const paymentstatus  = payementStatus.UNPAID
  const bookingamountstatus = installmentStatus.COMPLETED
  const lastbalance = user[0].wallet
  const bookingamountpaiddate = new Date()
  const firstInstallmentStatus = installmentStatus.COMPLETED
  const firstinstallmentpaiddate = new Date()

  const valuedata =  [
    paymentstatus,
    bookingamountstatus,
    bookingamountpaiddate,
    firstInstallmentStatus,
    firstinstallmentpaiddate,
    lastbalance,
    bookingid
  ]

  console.log(lastbalance);

  const updateBookingquery = `UPDATE booking SET paymentStatus = ?, bookingAmountStatus = ? ,bookingamountpaiddate =?,  firstInstallmentStatus = ?,  firstinstallmentpaiddate = ?, wallet = ? WHERE bookingid= ? `

  const [updatebooking] =  await pool.query(updateBookingquery,valuedata)
  return updatebooking;

}
const paySecondandthirdInstallment = async (req,res) =>{
  const bookingid = req.body.bookingid
  const userid = req.body.id
  const bookingquery = `SELECT * FROM booking WHERE bookingid = ?`
  const [booking] = await pool.query(bookingquery, [bookingid])

  if (!booking || booking.length === 0) {
    throw new NotFoundException('Booking not found');
  }

  if (booking[0].bookingStatus !== 'hold') {
    return res.send({ message: 'Booking request already approved or Rejected'});
  }

  if (booking[0].bookingAmountStatus !== 'completed') {
    return res.send({message:'please pay your previous installemnt first'});
  }
  const userquery =  `SELECT * FROM user WHERE id = ?`
  
  const [user] = await pool.query(userquery, [userid]);

  if (!user || user.length === 0) {
    throw new NotFoundException('User not found');
  }

  const firstinstalmentAmount =  booking[0].first_installment
  const secondinstalmentAmount =  booking[0].second_installment

  const  totalAmount = secondinstalmentAmount + firstinstalmentAmount
    if (parseInt(user[0].wallet) < parseInt(totalAmount)) {
    throw new HttpException('Insufficient balance! please deposit to your wallet', httpStatus.BAD_REQUEST);
  }

 
  console.log(totalAmount)
   const updatedwalet =  parseInt(user[0].wallet) - parseInt(totalAmount)

   const value =[
    updatedwalet,
    userid
   ]

   const  updatequery = `UPDATE user SET wallet = ? WHERE id = ? `
   await pool.query(updatequery, value)


  const paymentstatus  = payementStatus.PAID
  const firstInstallmentStatus = installmentStatus.COMPLETED
  const firstinstallmentpaiddate = new Date()

  const secondInstallmentStatus = installmentStatus.COMPLETED
  const secondinstallmentpaiddate = new Date()
  const bookingstatus = bookingStatus.ISSUE_IN_PROCESS

  const valuedata =  [
    paymentstatus,
    firstInstallmentStatus,
    firstinstallmentpaiddate,
    secondInstallmentStatus,
    secondinstallmentpaiddate,
    bookingstatus,
    updatedwalet,
    bookingid
  ]
  
  console.log(valuedata)
  const updateBookingquery = `UPDATE booking SET paymentStatus = ?,  secondInstallmentStatus =?, 
  secondinstallmentpaidate=?, firstInstallmentStatus = ?,   firstinstallmentpaiddate = ?, bookingStatus=?, wallet = ? WHERE bookingid= ? `

  const [updatebooking] =  await pool.query(updateBookingquery,valuedata)
  return updatebooking;
  
}



const paySecondInstallment = async (req,res) =>{
  const bookingid = req.body.bookingid
  const userid = req.body.id
  const packagequery = `SELECT *  FROM booking WHERE bookingid =?`
  const [booking] = await pool.query(packagequery, [bookingid])
  if (!booking || booking.length === 0) {
    throw new NotFoundException('Booking not found');
  }

  if (booking[0].bookingStatus !== 'hold') {
    throw new NotFoundException('Booking request already approved or Rejected');
  }

  if(booking[0].bookingAmountStatus !== 'completed' || null) {
    throw new NotFoundException('booking amount is not paid yet');
  }

  const userquery =  `SELECT * FROM user WHERE id = ?`

  const [user] = await pool.query(userquery, [userid]);

  if (!user || user.length === 0) {
    throw new NotFoundException('User not found');
  }
  const first_installment = booking[0].first_installment;
  console.log(user[0].wallet);
  console.log(first_installment);

  const currentDate = new Date(); // Use JavaScript Date objects
  const dueDate = booking.first_installment_due_date;
  if (currentDate > dueDate) {
    throw new HttpException(
      'The due date for the installment has passed please contact with us',
      httpStatus.BAD_REQUEST,
    );
  }

    // Check wallet balance
    if (user[0].wallet < first_installment) {
    throw new HttpException('Insufficient balance! please deposit to your wallet', httpStatus.BAD_REQUEST);
  }

   const updatedwalet =  user[0].wallet - first_installment
   console.log(updatedwalet);

   const value =[
    updatedwalet,
    userid
   ]

  const  updatequery = `UPDATE user SET wallet = ? WHERE id =? `
  await pool.query(updatequery, value)

  const paymentstatus  = payementStatus.FIRSTINSTALLMENT
  const firstInstallmentStatus = installmentStatus.COMPLETED
  const lastbalance = user[0].wallet
  const firstinstallmentpaiddate = new Date()

  const valuedata =  [
    paymentstatus,
    firstInstallmentStatus,
    firstinstallmentpaiddate,
    lastbalance,
    bookingid
  ]
  console.log(valuedata)

  const updateBookingquery = `UPDATE booking SET paymentStatus = ?, firstInstallmentStatus = ? ,firstinstallmentpaiddate =?,  wallet = ? WHERE bookingid= ? `

  const [updatebooing] =  await pool.query(updateBookingquery,valuedata)
  return updatebooing;
}



const paythiredInstallment = async (req,res) =>{
  const bookingid = req.body.bookingid
  const userid = req.body.id
  const packagequery = `SELECT *  FROM booking WHERE bookingid =?`
  const [booking] = await pool.query(packagequery, [bookingid])
  if (!booking || booking.length === 0) {
    throw new NotFoundException('Booking not found');
  }

  if (booking[0].bookingStatus !== 'hold') {
    throw new NotFoundException('Booking request already approved or Rejected');
  }

  if( booking[0].firstInstallmentStatus !=='complete' &&  booking[0].bookingAmountStatus !=='complete'){
   return res.send({ message:"please pay your early installment"})
  }

  const userquery =  `SELECT * FROM user WHERE id = ?`
  const [user] = await pool.query(userquery, [userid]);
  if (!user || user.length === 0) {
    throw new NotFoundException('User not found');
  }
  const second_installment = booking[0].second_installment;
  console.log(user[0].wallet);
  console.log(second_installment);

  const currentDate = new Date(); // Use JavaScript Date objects
  const dueDate = booking.second_installment_due_date;

  if (currentDate > dueDate) {
    throw new HttpException(
      'The due date for the installment has passed please contact with us',
      httpStatus.BAD_REQUEST,
    );
  }

    // Check wallet balance
    if (user[0].wallet < second_installment) {
    throw new HttpException('Insufficient balance! please deposit to your wallet', httpStatus.BAD_REQUEST);
  }

 
   const updatedwalet =  parseInt(user[0].wallet) - parseInt(second_installment)
   console.log(updatedwalet);

   const value =[
    updatedwalet,
    userid
   ]

  const  updatequery = `UPDATE user SET wallet = ? WHERE id =? `
  await pool.query(updatequery, value)

  const paymentstatus  = payementStatus.PAID
  const InstallmentStatus = installmentStatus.COMPLETED
  const lastbalance = user[0].wallet
  const installmentpaidate = new Date()
  const bookingstatus = bookingStatus.ISSUE_IN_PROCESS

  const valuedata =  [
    paymentstatus,
    InstallmentStatus,
    installmentpaidate,
    bookingstatus,
    lastbalance,
    bookingid
  ]

  const updateBookingquery = `UPDATE booking SET paymentStatus = ?, secondInstallmentStatus = ? ,secondinstallmentpaidate =?, bookingStatus = ?,  wallet = ? WHERE bookingid= ? `
  const [updatebooing] =  await pool.query(updateBookingquery, valuedata)
  return updatebooing;

}







const initwithsslfullamount = async(req,res) =>{
  const transactionId = generateCustomTransactionId();
  const bookingid  = req.body.bookingid
  const userid  = req.body.id
  const bookingquery =  `SELECT * FROM booking WHERE bookingid=?`
  const [booking] = await pool.query(bookingquery, [bookingid]);
  const amount = booking[0].totalAmount

  const userquery =  `SELECT * FROM user WHERE id=?`
  const [user] =  await pool.query(userquery, [userid])

  const data = {
    store_id: process.env.SSL_STORE_ID,
    store_passwd: process.env.SSL_STORE_PASSWORD,
    total_amount: amount,
    currency: "BDT",
    tran_id: transactionId,
    tran_date: Date(),
    success_url: `http://localhost:4004/api/v1/payment/ssl/success/fullpayment/${transactionId}/${bookingid}`,
    fail_url: `http://localhost:4004/api/v1/ssl/failure/${transactionId}`,
    cancel_url: `http://localhost:4004/api/v1/ssl/cancel/${transactionId}`,
    emi_option: 0,
    cus_name: user[0].name ,
    cus_email:  user[0].email ,
    cus_phone:  user[0].phone,
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    shipping_method: "NO",
    product_name: "Sample Product",
    product_category: "Sample Category",
    product_profile: "general",
    value_a: "scfcc" || user[0].userid,
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


const sucesssslfullamount = async (req,res)=>{
  const tran_id = req.params.tran_id;
  const bookingid = req.params.bookingid
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



  const bookingstatus = bookingStatus.ISSUE_IN_PROCESS
  const paymentstatus  = payementStatus.PAID

  const value = [
    paymentstatus,
    bookingstatus,
    bookingid
  ]
  const updatequery  = `UPDATE booking SET paymentStatus=?,  bookingStatus = ? WHERE bookingid = ?`
  const updatebooking = await pool.query(updatequery, value)
  return res.status(200).json({
    status: 'success',
    message: 'Payment success',
  });
} 




const initwithsslbookingmoney = async(req,res) =>{
  const transactionId = generateCustomTransactionId();
  const bookingid  = req.body.bookingid
  const userid  = req.body.id
  const bookingquery =  `SELECT * FROM booking WHERE bookingid=?`
  const [booking] = await pool.query(bookingquery, [bookingid]);
  const amount = booking[0].booking_money

  const userquery =  `SELECT * FROM user WHERE id=?`
  const [user] =  await pool.query(userquery, [userid])

  console.log(user)


  const data = {
    store_id: process.env.SSL_STORE_ID,
    store_passwd: process.env.SSL_STORE_PASSWORD,
    total_amount: amount,
    currency: "BDT",
    tran_id: transactionId,
    tran_date: Date(),
    success_url: `http://localhost:4004/api/v1/payment/ssl/success/bookingamount/${transactionId}/${bookingid}`,
    fail_url: `http://localhost:4004/api/v1/ssl/failure/${transactionId}`,
    cancel_url: `http://localhost:4004/api/v1/ssl/cancel/${transactionId}`,
    emi_option: 0,
    cus_name: user[0].name,
    cus_email:  user[0].email ,
    cus_phone:  user[0].phone ,
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    shipping_method: "NO",
    product_name: "Sample Product",
    product_category: "Sample Category",
    product_profile: "general",
    value_a: "scfcc" || user[0].userid,
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


const sucess_ssl_bookingAmount = async (req,res)=>{
  const tran_id = req.params.tran_id;
  const bookingid = req.params.bookingid
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



  const bookingamountstatus = installmentStatus.COMPLETED
  const paiddate = new Date()

  const value = [
    bookingamountstatus,
    paiddate,
    bookingid
  ]

  const updatequery  = `UPDATE booking SET bookingAmountStatus=?,  bookingamountpaiddate=? WHERE bookingid = ?`
  const updatebooking = await pool.query(updatequery, value)

  return res.status(200).json({
    status: 'success',
    message: 'Payment success',
  });
} 






const initwithssl1stinstallemnt = async(req,res) =>{
  const transactionId = generateCustomTransactionId();
  const bookingid  = req.body.bookingid
  const userid  = req.body.id
  const bookingquery =  `SELECT * FROM booking WHERE bookingid=?`
  const [booking] = await pool.query(bookingquery, [bookingid]);
  const amount = booking[0].first_installment

  if(booking.length ===0){
    return res.send({message:"booking not found"})
  }

  const userquery =  `SELECT * FROM user WHERE id=?`
  const [user] =  await pool.query(userquery, [userid])

  console.log(user)


  const data = {
    store_id: process.env.SSL_STORE_ID,
    store_passwd: process.env.SSL_STORE_PASSWORD,
    total_amount: parseInt(amount),
    currency: "BDT",
    tran_id: transactionId,
    tran_date: Date(),
    success_url: `http://localhost:4004/api/v1/payment/ssl/success/1stinstallment/${transactionId}/${bookingid}`,
    fail_url: `http://localhost:4004/api/v1/ssl/failure/${transactionId}`,
    cancel_url: `http://localhost:4004/api/v1/ssl/cancel/${transactionId}`,
    emi_option: 0,
    cus_name: user[0].name,
    cus_email:  user[0].email ,
    cus_phone:  user[0].phone ,
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    shipping_method: "NO",
    product_name: "Sample Product",
    product_category: "Sample Category",
    product_profile: "general",
    value_a: "scfcc" || user[0].userid,
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


const success_ssl_1stinstallemnt = async (req,res)=>{
  const tran_id = req.params.tran_id;
  const bookingid = req.params.bookingid
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



  const firstinstallemnttstatus = installmentStatus.COMPLETED
  const paiddate = new Date()

  const value = [
    firstinstallemnttstatus,
    paiddate,
    bookingid
  ]

  const updatequery  = `UPDATE booking SET firstInstallmentStatus=?,  firstinstallmentpaiddate=? WHERE bookingid = ?`
  const updatebooking = await pool.query(updatequery, value)

  return res.status(200).json({
    status: 'success',
    message: 'Payment success',
  });
} 



const initwithssl2ndinstallemnt = async(req,res) =>{
  const transactionId = generateCustomTransactionId();
  const bookingid  = req.body.bookingid
  const userid  = req.body.id
  const bookingquery =  `SELECT * FROM booking WHERE bookingid=?`
  const [booking] = await pool.query(bookingquery, [bookingid]);
  const amount = booking[0].second_installment

  if(booking.length ===0){
    return res.send({message:"booking not found"})
  }

  const userquery =  `SELECT * FROM user WHERE id=?`
  const [user] =  await pool.query(userquery, [userid])

  console.log(user)


  const data = {
    store_id: process.env.SSL_STORE_ID,
    store_passwd: process.env.SSL_STORE_PASSWORD,
    total_amount: parseInt(amount),
    currency: "BDT",
    tran_id: transactionId,
    tran_date: Date(),
    success_url: `http://localhost:4004/api/v1/payment/ssl/success/2ndinstallment/${transactionId}/${bookingid}`,
    fail_url: `http://localhost:4004/api/v1/ssl/failure/${transactionId}`,
    cancel_url: `http://localhost:4004/api/v1/ssl/cancel/${transactionId}`,
    emi_option: 0,
    cus_name: user[0].name,
    cus_email:  user[0].email ,
    cus_phone:  user[0].phone ,
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    shipping_method: "NO",
    product_name: "Sample Product",
    product_category: "Sample Category",
    product_profile: "general",
    value_a: "scfcc" || user[0].userid,
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


const success_ssl_2ndinstallemnt = async (req,res)=>{
  const tran_id = req.params.tran_id;
  const bookingid = req.params.bookingid
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

  const secondinstallemnttstatus = installmentStatus.COMPLETED
  const paiddate = new Date()
  const bookingstatus = bookingStatus.ISSUE_IN_PROCESS
  const paymentstatus = payementStatus.PAID

  const value = [
    paymentstatus,
    bookingstatus,
    secondinstallemnttstatus,
    paiddate,
    bookingid
  ]
  const updatequery  = `UPDATE booking SET paymentStatus=?,bookingStatus=?,  secondInstallmentStatus=?,  second_installment_due_date=? WHERE bookingid = ?`
  await pool.query(updatequery, value)
  return res.status(200).json({
    status: 'success',
    message: 'Payment success',
  });
} 



  
export const payemntService = {
  paywithwallet,
  paybookingamount,
  paySecondInstallment,
  paythiredInstallment,
  payFirstandSecondInstallment,
  paySecondandthirdInstallment,
  initwithsslfullamount,
  sucesssslfullamount,
  initwithsslbookingmoney,
  sucess_ssl_bookingAmount,
  initwithssl1stinstallemnt,
  success_ssl_1stinstallemnt,
  initwithssl2ndinstallemnt,
  success_ssl_2ndinstallemnt

}
