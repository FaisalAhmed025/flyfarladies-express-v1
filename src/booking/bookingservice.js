import httpStatus from "http-status";
import {HttpException} from "express-sharp";
import pool from "../database/db";
import { payementStatus } from "../payment/service";
import nodemailer from 'nodemailer'


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
    if (tourpackage.length === 0) {
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

const bookingAt = date.toLocaleString('en-BD', options);

const totaladult = adult.length
const totalchild = child.length
const totalinfant = infant.length

const bookingstatus  =  bookingStatus.HOLD
const adultprice =  tourpackage[0].adult_base_price 
const childprice=  tourpackage[0].child_base_price
const infantprice  = tourpackage[0].infant_base_price

const installmentQuery= `SELECT * FROM installment WHERE tourpackageId =? `
const [installmentdata] = await pool.query(installmentQuery, [packgeId])

let totalAdultprice = (installmentdata[0].ABookingAmount +
  installmentdata[0].AFirstInstallmentAmount +
  installmentdata[0].ASecondInstallmentAmount) * totaladult;

let totalChildprice = (installmentdata[0].CBookingAmount +
  installmentdata[0].CFirstInstallmentAmount +
  installmentdata[0].CSecondInstallmentAmount) * totalchild;

let totalInfantprice = (installmentdata[0].IBookingAmount +
  installmentdata[0].IFirstInstallmentAmount +
  installmentdata[0].ISecondInstallmentAmount) * totalinfant;

const [addonServices] = await pool.query('SELECT * FROM add_ons WHERE tour_package_id = ?', [packgeId])

const selectedAddonsFromRequest = req.body.selectedAddons || [];
    let addonTotal = 0;
    if (addonServices && addonServices.length > 0) {
      for (const selectaddn of selectedAddonsFromRequest) {
        const { service, description, cost } = selectaddn;
        // Save addon booking
        const insertAddonQuery = `
          INSERT INTO addon_booking (service, description, cost, packageId, userid, bookingId) 
          VALUES (?, ?, ?, ?, ?, ?)
        `;
        await pool.query(insertAddonQuery, [service, description, cost, packgeId, userid, bookingid]);
        addonTotal += cost;
      }
    }

const totalpackageprice = totalAdultprice+totalChildprice+totalInfantprice +addonTotal;

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

const bookingamount =totalAdultBookingAmount + totalChildBookingAmount+ totalInfantBookingAmount +addonTotal
const firstinstallement = totalAdultFirstInstallmentAmount+totalChildFirstInstallmentAmount+totalInfantFirstInstallmentAmount
const secondinstalemnt = totalAdultSecondInstallmentAmount+ totalChildSecondInstallmentAmount+ totalInfantSecondInstallmentAmount

const paymentstatus = payementStatus.UNPAID
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
      tourpackage[0].City,
      tourpackage[0].Flight,
      tourpackage[0].Food,
      tourpackage[0].Transport,
      tourpackage[0].Hotel,
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
      bookingstatus,
      bookingAt
      
    ];


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
        city,
        flight,
        food,
        transport,
        hotel,
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
        bookingStatus,
        bookingDate
      ) VALUES (?, ?, ?,?, ?,?, ?, ?,?, ?, ?, ?, ?, ?,?, ?, ?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?, ?, ?, ?, ?, ?)`,
      values
    );


    const bookingSlotId = req.body.id
    const  slotquery = `SELECT * FROM bookingslot WHERE id=?`
    const [slot] =  await pool.query(slotquery,[bookingSlotId])

    if (slot?.length > 0) {
      const slotstartdate = new Date(slot[0].StartDate);
      const bookingStartDateObj = new Date(slotstartdate);
      const FirstInstallmentdueDate = new Date(installmentdata[0].FirstInstallmentdueDate);
      const SecondInstallmentdueDate = new Date(installmentdata[0].SecondInstallmentdueDate);
      const ThirdInstallmentdueDate = new Date(installmentdata[0].ThirdInstallmentdueDate);
    
      // Calculate the differences between the installments
      const differenceBetweenFirstAndSecondInstallments = Math.floor((SecondInstallmentdueDate - FirstInstallmentdueDate) / (1000 * 60 * 60 * 24));
      const differenceBetweenSecondAndThirdInstallments = Math.floor((ThirdInstallmentdueDate - SecondInstallmentdueDate) / (1000 * 60 * 60 * 24));
      
    
      // Adjust the new first installment due date
      const newFirstInstallmentdueDate = new Date(bookingStartDateObj);
      // newFirstInstallmentdueDate.setDate(newFirstInstallmentdueDate.getDate() + differenceBetweenFirstAndSecondInstallments);
    

      // Adjust the new second installment due date
      const newSecondInstallmentdueDate = new Date(newFirstInstallmentdueDate);
      newSecondInstallmentdueDate.setDate(newSecondInstallmentdueDate.getDate() + differenceBetweenFirstAndSecondInstallments);
    
      // Adjust the new third installment due date
      const newThirdInstallmentdueDate = new Date(newSecondInstallmentdueDate);
      newThirdInstallmentdueDate.setDate(newThirdInstallmentdueDate.getDate() + differenceBetweenSecondAndThirdInstallments);
    
      const updateBookingQuery = `
        UPDATE booking
        SET booking_money_due_date = ?,
        first_installment_due_date=?,
        second_installment_due_date = ?
        WHERE bookingid = ?
      `;
      
      await pool.query(updateBookingQuery, [
        newFirstInstallmentdueDate.toISOString().split('T')[0],
        newSecondInstallmentdueDate.toISOString().split('T')[0],
        newThirdInstallmentdueDate.toISOString().split('T')[0],
        bookingid
      ]);
    }
    

    const transporter = nodemailer.createTransport({
      host: 'b2b.flyfarint.com', // Replace with your email service provider's SMTP host
      port: 465, // Replace with your email service provider's SMTP port
      secure: true, // Use TLS for secure connection
      auth: {
        user: 'flyfarladies@mailservice.center', // Replace with your email address
        pass: 'YVWJCU.?UY^R', // Replace with your email password
      },
    });


    const htmlContent = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <style>
        body {
          padding: 0px 25px;
        }
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th {
          background-color: #ffe3ea;
          color: #bc6277;
          font-weight: 500;
        }
    
        th,
        td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
          font-size: 10px;
        }
        p {
          font-size: 10px;
        }
    
        .title {
          color: #9c9797;
          font-style: italic;
          width: 30%;
        }
        h4 {
          font-size: 12px;
        }
      </style>
      <body>
        <div class="header" style="margin-bottom: 5px;margin-top: 30px">
          <div class="logo">
            <img  style="width: 130px" src="https://storage.googleapis.com/cdnflyfarladiesv2/logo%20ladies.png" alt="" />
    
          </div>
        </div>
    
        <div class="bookingItenaryDetails">
          <h4 style="background-color: #bc6277; padding: 5px 10px; color: #ffffff">
            BOOKING & TOUR ITENARY DETAILS
          </h4>
    
            
          <table>
          <tr>
            <td class="title">Booking ID</td>
            <td>${bookingid}</td>
          </tr>
          <tr>
            <td class="title">Booking Date</td>
            <td>${bookingAt}</td>
          </tr>
          <tr>
            <td class="title">Package Type</td>
            <td>${tourpackage[0].TripType}</td>
          </tr>
          <tr>
            <td class="title">Package Name</td>
            <td>${tourpackage[0].MainTitle}</td>
          </tr>
          <tr>
            <td class="title">Journey Start & End Date</td>
            <td>${tourpackage[0].StartDate},${tourpackage[0].EndDate}</td>
          </tr>
          <tr>
            <td class="title">Duration</td>
            <td>${tourpackage[0].TotalDuration}</td>
          </tr>
          <tr>
            <td class="title">Total Passenger</td>
            <td>${tourpackage[0].totalseat}</td>
          </tr>
          <tr>
            <td class="title">Total Cost</td>
            <td>${totalpackageprice}</td>
          </tr>
        </table>
    
        <div class="bookingItenaryDetails" style="margin-top: 50px">
        <h4 style="background-color: #bc6277; padding: 5px 10px; color: #ffffff">
          TRAVELLER DETAILS
        </h4>
      
        <table>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Nationality</th>
            <th>NID/ Passport No</th>
          </tr>
      
              <tr>
              ${adult
                .map(
                  (traveler) => `
                <td>${traveler.afName} ${traveler.alName}</td>
                <td>${traveler.aPaxType}</td>
                <td>${traveler.agender}</td>
                <td>${traveler.adob}</td>
                <td>${traveler.Nationality}</td>
                <td>${traveler.PassportNumber}</td>
              </tr>
            `
            ).join('')}
      
          ${child
            .map(
              (traveler) => `
              <tr>
                <td>${traveler.cfName} ${traveler.clName}</td>
                <td>${traveler.cpaxType}</td>
                <td>${traveler.cgender}</td>
                <td>${traveler.cdob}</td>
                <td>${traveler.cnationality}</td>
                <td>${traveler.cpassportNumber}</td>
              </tr>
            `,
            )
            .join('')}
            
          ${infant
            .map(
              (traveler) => `
              <tr>
                <td>${traveler.ifName} ${traveler.ilName}</td>
                <td>${traveler.ipaxType}</td>
                <td>${traveler.igender}</td>
                <td>${traveler.idob}</td>
                <td>${traveler.inationality}</td>
                <td>${traveler.ipassportNumber}</td>
              </tr>
            `,
            )
            .join('')}
        </table>
      </div>
      
          <div class="payemnt" style="margin-top: 50px">
            <h4
              style="
                background-color: #bc6277;
                padding: 5px 10px;
                color: #ffffff;
                letter-spacing: 2px;
              "
            >
              PAYMENT STATUS
            </h4>
    
            <h1
              style="text-transform: uppercase; font-size: 30px; font-weight: 600"
            >
              ${paymentstatus}
            </h1>
          </div>
        </div>
        <div class="notice" style="border: 1px solid #bc6277">
          <p style="padding-left: 20px; color: #bc6277">
            Kindly remember to bring this document with you on your travel date.
          </p>
          <p style="padding-left: 20px; color: #bc6277">
            Need more help? Mail us at support@flyfarladies.com or Call us at +88
            01755582111
          </p>
        </div>
      </body>
  </html>`;
    
    const usermail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: 'faisal@flyfar.tech', // Recipient's email address
      subject: 'Booking Details',
      text: 'Please find the attached file.',
      html:htmlContent

    };

    const supportmail = {
      from: 'flyfarladies@mailservice.center', // Replace with your email address
      to: 'support@flyfarladies.com', // Recipient's email address
      subject: 'Booking Details',
      text: 'Please find the attached file.',
      html:htmlContent

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

    return res.status(200).json({
      status: "success",
      message: "Booking success",
    });
  } catch (error) {
    console.log(error);
  }
}

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

  const addonsquery =`SELECT * FROM addon_booking  WHERE bookingid =?`
  const [addonsrresults] = await pool.execute(addonsquery, [bookingid]);
  console.log(bookingresults);
  return {bookingresults,passengerresults,addonsrresults};
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

const ApprovedBooking = async (req, res) => {
  try {
    const { bookingid } = req.params;
    const { action_by} = req.body;

    const connection = await pool.getConnection();

    // Update booking status
    const status =  bookingStatus.CONFIRMED
    const updateBookingQuery = `UPDATE booking SET bookingStatus = ?, action_by =? WHERE Bookingid = ?`;
    await connection.execute(updateBookingQuery, [status, action_by, bookingid]);
    connection.release();

    res.status(200).json({ success: true, message: 'Booking  has  confirmed.' });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};



const CancelledBooking = async (req, res) => {
  try {
    const { bookingid } = req.params;
    const { action_by,rejected_reason } = req.body;
    const connection = await pool.getConnection();
    // Update booking status
    const status =  bookingStatus.CANCELLED
    const updateBookingQuery = `UPDATE booking SET bookingStatus = ?, rejected_reason=?, action_by =? WHERE Bookingid = ?`;
    await connection.execute(updateBookingQuery, [status,rejected_reason, action_by, bookingid]);
    connection.release();
    res.status(200).json({ success: true, message: 'Booking  has  Cancelled.' });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

export const BookingService = {
  Book$Hold,
  getAllBooking,
  getSingleBooking,
  getBookingsByUserId,
  ApprovedBooking,
  CancelledBooking
}