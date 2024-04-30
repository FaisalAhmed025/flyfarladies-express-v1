import httpStatus from "http-status";
import {HttpException} from "express-sharp";
import pool from "../database/db";
import { payementStatus } from "../payment/service";


export const bookingStatus = {
  HOLD: "hold",
  PAID: "paid",
  ISSUE_IN_PROCESS: "issue_in_process",
  CONFIRMED:'confirmed',
  CANCELLED: "cancelled"
};

const generatebookingId = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "FFLB" + Math.floor(Math.random() * 10000);
};


const Book$Hold = async (req, res) => {
  try {
    const userid = req.params.id;
    const userQuery = `SELECT * FROM user WHERE id = ?`;
    const [user] = await pool.query(userQuery, [userid]);
    if (user.length ===0) {
      throw new HttpException(
        `User not found with this id=${userid}`,
        httpStatus.BAD_REQUEST
      );
    }

    const { email, wallet, name, phone } = user[0];
    const packgeId = req.params.PKID;
    const packgaeQuery = `SELECT * FROM tourpackage WHERE PKID = ?`;
    const [tourpackage] = await pool.query(packgaeQuery, [packgeId]);
    if (tourpackage.length ===0) {
      throw new HttpException(
        `TourPackage not found with this id=${packgeId}`,
        httpStatus.BAD_REQUEST
      );
    }

    const { adult, child, infant } = req.body;

    const bookingid = generatebookingId()

    if (Array.isArray(adult) && adult.length > 0) {
      // Prepare an array to hold all adult traveler values
      const adultTravelersValues = [];
      for (const adulttraveler of adult) {
        const {
          afName,
          alName,
          adob,
          passDate,
          PassportNumber,
          Nationality,
          agender,
          aPaxType,
        } = adulttraveler;
        const passportDateValue = passDate ? passDate : null;
        const passportNumber = PassportNumber ? PassportNumber:null;
        // Add current adult traveler's values to the array
        adultTravelersValues.push([
          aPaxType,
          afName,
          alName,
          Nationality,
          agender,
          adob,
          passportDateValue,
          passportNumber,
          bookingid,
          userid
        ]);
      }

      const addpassenger = `
          INSERT INTO passenger (paxType, fName, lName, nationality, gender, dob, passDate, passportNumber, bookingid, userid)
          VALUES ?
      `;
      // Execute the SQL query to insert all adult travelers
       await pool.query(addpassenger, [adultTravelersValues]);
    }


    
    if (Array.isArray(child) && child.length > 0) {
      // Prepare an array to hold all adult traveler values
      const childTravelersValues = [];
      
      for (const childtraveler of child) {
        const {
          cfName,
          clName,
          cdob,
          cpassDate,
          cpassportNumber,
          cnationality,
          cgender,
          cpaxType,
        } = childtraveler;

        const passportDateValue = cpassDate ? cpassDate : null;
        const passportNumber = cpassportNumber ? cpassportNumber:null;

        // Add current adult traveler's values to the array
        childTravelersValues.push([
          cpaxType,
          cfName,
          clName,
          cnationality,
          cgender,
          cdob,
          passportDateValue,
          passportNumber,
          bookingid,
          userid
        ]);
      }

      const addChildPassengerQuery  = `
      INSERT INTO passenger (paxType, fName, lName, nationality, gender, dob, passDate, passportNumber, bookingid, userid)
      VALUES ?
  `;
      // Execute the SQL query to insert all adult travelers
      const newTravelerResult = await pool.query(addChildPassengerQuery , [childTravelersValues]);

      console.log(newTravelerResult)

      // Assuming you need to process the result or do something with it
      const newTravelers = newTravelerResult.rows;

      // Assuming you need to update total amount and push travelers to the array
    }


    if (Array.isArray(infant) && infant.length > 0) {
      // Prepare an array to hold all adult traveler values
      const infantTravelersValues = [];

      for (const infanttraveler of infant) {
        const {
          ipaxType,
          ifName,
          ilName,
          inationality,
          igender,
          idob,
          ipassDate,
          ipassportNumber,
        } = infanttraveler;

       const passportDateValue =ipassDate? ipassDate:null
       const passportNumber = ipassportNumber ? ipassportNumber:null

        // Add current adult traveler's values to the array
        infantTravelersValues.push([
          ipaxType,
          ifName,
          ilName,
          inationality,
          igender,
          idob,
          passportDateValue,
          passportNumber,
          bookingid,
          userid
        ]);
      }

      const addInfantPassengerQuery  = `
      INSERT INTO passenger (paxType, fName, lName, nationality, gender, dob, passDate, passportNumber, bookingid, userid)
      VALUES ?
  `;
      // Execute the SQL query to insert all adult travelers
    await pool.query(addInfantPassengerQuery , [infantTravelersValues]);
  }

const totaladult = adult.length
const totalchild = child.length
const totalinfant = infant.length

const bookingstatus  =  bookingStatus.HOLD
const adultprice =  tourpackage[0].adult_base_price 
const childprice=  tourpackage[0].child_base_price
const infantprice  = tourpackage[0].infant_base_price

const installmentQuery= `SELECT * FROM installment WHERE tourpackageId =? `
const [installmentdata] = await pool.query(installmentQuery, [packgeId])

console.log(installmentdata)

let totalAdultprice = (installmentdata[0].ABookingAmount +
  installmentdata[0].AFirstInstallmentAmount +
  installmentdata[0].ASecondInstallmentAmount) * totaladult;

let totalChildprice = (installmentdata[0].CBookingAmount +
  installmentdata[0].CFirstInstallmentAmount +
  installmentdata[0].CSecondInstallmentAmount) * totalchild;

let totalInfantprice = (installmentdata[0].IBookingAmount +
  installmentdata[0].IFirstInstallmentAmount +
  installmentdata[0].ISecondInstallmentAmount) * totalinfant;

console.log("Total Adult Price: ", totalAdultprice);
console.log("Total Child Price: ", totalChildprice);
console.log("Total Infant Price: ", totalInfantprice);

// const [addonServices] = await pool.query('SELECT * FROM add_ons WHERE tour_package_id = ?', [packgeId])

// const selectedAddonsFromRequest = req.body.selectedAddons || [];

// let addonTotal = 0;

//     if (addonServices && addonServices.length > 0) {
//       for (const selectaddn of selectedAddonsFromRequest) {
//         const { service, description, cost } = selectaddn;

//         // Save addon booking
//         const insertAddonQuery = `
//           INSERT INTO AddonBooking (service, description, cost, packageId, userid, bookingId) 
//           VALUES (?, ?, ?, ?, ?, ?)
//         `;
//         await connection.query(insertAddonQuery, [service, description, cost, Id, user.uuid, newbooking.Bookingid]);
        
//         addonTotal += cost;
//       }
//     }

console.log(adultprice,childprice, infantprice)
const totalpackageprice = totalAdultprice+totalChildprice+totalInfantprice;

let totalAdultBookingAmount = installmentdata[0].ABookingAmount * totaladult;
let totalChildBookingAmount = installmentdata[0].CBookingAmount * totalchild;
let totalInfantBookingAmount = installmentdata[0].IBookingAmount * totalinfant;
let totalAdultFirstInstallmentAmount = installmentdata[0].AFirstInstallmentAmount * totaladult;
let totalChildFirstInstallmentAmount = installmentdata[0].CFirstInstallmentAmount * totalchild;
let totalInfantFirstInstallmentAmount = installmentdata[0].IFirstInstallmentAmount * totalinfant;

// Total second installment amount calculation
let totalAdultSecondInstallmentAmount = installmentdata[0].ASecondInstallmentAmount * totaladult;
let totalChildSecondInstallmentAmount = installmentdata[0].CSecondInstallmentAmount * totalchild;
let totalInfantSecondInstallmentAmount = installmentdata[0].ISecondInstallmentAmount * totalinfant;

const bookingamount =totalAdultBookingAmount + totalChildBookingAmount+ totalInfantBookingAmount
const firstinstallement = totalAdultFirstInstallmentAmount+totalChildFirstInstallmentAmount+totalInfantFirstInstallmentAmount
const secondinstalemnt = totalAdultSecondInstallmentAmount+ totalChildSecondInstallmentAmount+ totalInfantSecondInstallmentAmount

const paymentstatus = payementStatus.UNPAID
console.log(totalpackageprice);
    const values = [
      bookingid,
      userid,
      email,
      name,
      wallet,
      tourpackage[0].PKID,
      tourpackage[0].MainTitle,
      tourpackage[0].StartDate,
      tourpackage[0].EndDate,
      tourpackage[0].TripType,
      tourpackage[0].TotalDuration,
      adultprice,
      childprice,
      infantprice,
      bookingamount,
      firstinstallement,
      secondinstalemnt,
      installmentdata[0].FirstInstallmentdueDate,
      installmentdata[0].SecondInstallmentdueDate,
      installmentdata[0].ThirdInstallmentdueDate,
      totaladult,
      totalchild,
      totalinfant,
      totalAdultprice,
      totalChildprice,
      totalInfantprice,
      phone,
      totalpackageprice,
      paymentstatus,
      bookingstatus
      
    ];

    console.log(values);

    const [result] = await pool.query(
      `INSERT INTO booking (
        bookingid,
        userid,
        email,
        name,
        wallet,
        PkID,
        MainTitle,
        StartDate,
        EndDate,
        TripType,
        TotalDuration,
        adult_price,
        child_price,
        infant_price,
        booking_money,
        first_installment,
        second_installment,
        booking_money_due_date,
        first_installment_due_date,
        second_installment_due_date,
        totaladult,
        totalchild,
        totalinfant,
        totalAdultprice,
        totalChildprice,
        totalInfantprice,
        phone,
        totalAmount,
        paymentStatus,
        bookingStatus
      ) VALUES (?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?, ?, ?, ?, ?, ?)`,
      values
    );

    console.log(result)

    return res.status(200).json({
      status: "success",
      message: "Booking success",
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllBooking = async (req,res) =>{
  const packagequery = `SELECT * FROM  booking`
  const [bookingresults] = await pool.execute(packagequery);
  console.log(bookingresults);
  return bookingresults;
}

const getSingleBooking = async (req,res) =>{
  const  bookingid = req.params.bookingid;
  const bookingequery = `SELECT * FROM  booking WHERE bookingid =?`
  const [bookingresults] = await pool.execute(bookingequery, [bookingid]);

  const passengerquery =`SELECT * FROM passenger  WHERE bookingid =?`
  const [passengerresults] = await pool.execute(passengerquery, [bookingid]);
  console.log(bookingresults);
  return {bookingresults,passengerresults};
}


const getBookingsByUserId = async (req, res) => {
  try {
    // Assuming userid is obtained from request parameters or session
    const userId = req.params.userid;

    // Query to fetch bookings for the given user
    const bookingQuery = `SELECT * FROM booking WHERE userid = ?`;
    const [bookingResults] = await pool.execute(bookingQuery, [userId]);

    // Iterate through booking results to fetch passengers for each booking
    const bookingsWithPassengers = await Promise.all(bookingResults.map(async (booking) => {
      const passengerQuery = `SELECT * FROM passenger WHERE bookingid = ?`;
      const [passengerResults] = await pool.execute(passengerQuery, [booking.bookingid]);
      return { booking, passengers: passengerResults };
    }));

    res.status(200).json(bookingsWithPassengers);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};



export const BookingService = {
  Book$Hold,
  getAllBooking,
  getSingleBooking,
  getBookingsByUserId
}