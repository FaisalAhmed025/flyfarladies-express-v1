import httpStatus from "http-status"
import pool from "../database/db"
import { bookingStatus } from "../booking/bookingservice"
import { HttpException, NotFoundException } from "express-sharp"

export const payementStatus ={
  PAID: 'paid',
  UNPAID: "unpaid"
}



const paywithwallet = async(req,res)=>{
try {

  const  userid = req.params.id
  const bookingid = req.params.bookingid
  const  bookingquery =  `SELECT * FROM booking WHERE bookingid=?`

  const [booking] = await pool.query(bookingquery, [bookingid])

  if (!booking || booking.length === 0) {
    throw new NotFoundException('Booking not found');
  }

  if (booking[0].bookingStatus !== 'HOLD') {
    throw new NotFoundException('Booking request already approved or Rejected');
  }
  const userquery =  `SELECT * FROM user WHERE id = ?`

  const [user] = await pool.query(userquery, [userid]);

  if (!user || user.length === 0) {
    throw new NotFoundException('User not found');
  }

  const totalprice = booking[0].totalAmount;
  console.log(user[0].wallet)
  console.log(totalprice)

    // Check wallet balance
    if (user[0].wallet < totalprice) {
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

    const depositby = `${user[0].name}`;
    const status = 'purchase'

    const ledgervalue = [
      userid,
      depositby,
      paymentstatus,
      totalprice,
      bookingid,
      status
    ]

    const insertledger = 'INSERT INTO ledger (userID, depositby, paymentStatus, amount, bookingrefId, Date, status) VALUES (?, ?, ?, ?, ?, NOW(), ?)'
    await pool.query (insertledger, ledgervalue)
  
} catch (error) {
  console.error("Error making payment with wallet:", error);
  throw error;
  
}





}

export const payemntService = {
  paywithwallet
}