import httpStatus from "http-status";
import {HttpException} from "express-sharp";
import pool from "../database/db";


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

    const packgeId = req.params.PkID;
    const packgaeQuery = `SELECT * FROM tourpackage WHERE PkID = ?`;
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

        // Add current adult traveler's values to the array
        adultTravelersValues.push([
          aPaxType,
          afName,
          alName,
          Nationality,
          agender,
          adob,
          passDate,
          PassportNumber,
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

        // Add current adult traveler's values to the array
        childTravelersValues.push([
          cpaxType,
          cfName,
          clName,
          cnationality,
          cgender,
          cdob,
          cpassDate,
          cpassportNumber,
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

        // Add current adult traveler's values to the array
        infantTravelersValues.push([
          ipaxType,
          ifName,
          ilName,
          inationality,
          igender,
          idob,
          ipassDate,
          ipassportNumber,
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

const adultprice =  tourpackage[0].adult_base_price *totaladult;
const childprice=  tourpackage[0].child_base_price * totalchild;
const infantprice  = tourpackage[0].infant_base_price * totalinfant;


console.log(adultprice,childprice, infantprice)

const totalpackageprice = adultprice+childprice+infantprice

console.log(totalpackageprice);

    const values = [
      bookingid,
      userid,
      email,
      name,
      wallet,
      tourpackage[0].PkID,
      tourpackage[0].MainTitle,
      tourpackage[0].StartDate,
      tourpackage[0].EndDate,
      tourpackage[0].TripType,
      tourpackage[0].TotalDuration,
      tourpackage[0].adult_base_price,
      tourpackage[0].child_base_price,
      tourpackage[0].infant_base_price,
      tourpackage[0].booking_money,
      tourpackage[0].first_installment,
      tourpackage[0].second_installment,
      tourpackage[0].booking_money_due_date,
      tourpackage[0].first_installment_due_date,
      tourpackage[0].second_installment_due_date,
      totaladult,
      totalchild,
      totalinfant,
      phone,
      totalpackageprice,
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
        adult_base_price,
        child_base_price,
        infant_base_price,
        booking_money,
        first_installment,
        second_installment,
        booking_money_due_date,
        first_installment_due_date,
        second_installment_due_date,
        totaladult,
        totalchild,
        totalinfant,
        phone,
        totalAmount,
        bookingStatus
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?, ?, ?, ?, ?, ?)`,
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