import httpStatus from "http-status"
import pool from "../database/db"
import { bookingStatus } from "../booking/bookingservice"
import { HttpException, NotFoundException } from "express-sharp"

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

 
   const updatedwalet =  user[0].wallet - totalAmount
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
    throw new NotFoundException('Booking request already approved or Rejected');
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

  if(booking[0].bookingAmountStatus !== 'completed') {
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

 
   const updatedwalet =  user[0].wallet - second_installment
   console.log(updatedwalet);

   const value =[
    updatedwalet,
    userid
   ]

  const  updatequery = `UPDATE user SET wallet = ? WHERE id =? `
  await pool.query(updatequery, value)

  const paymentstatus  = payementStatus.PAID
  const InstallmentStatus = installmentStatus.COMPLETED
  const lastbalance = user[0].walletp
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



export const payemntService = {
  paywithwallet,
  paybookingamount,
  paySecondInstallment,
  paythiredInstallment,
  payFirstandSecondInstallment,
  paySecondandthirdInstallment
}