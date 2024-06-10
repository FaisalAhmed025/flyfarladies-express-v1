import httpStatus from "http-status";
import pool from "../database/db";
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import xlsx from 'xlsx';
import moment  from "moment";

const generateExcelReportBuffer = (data) => {
  const worksheet = xlsx.utils.json_to_sheet(data);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "New Users");
  const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  return buffer;
};

const sendEmailWithAttachment = (subject, body, attachmentBuffer) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your email service provider's SMTP host
    port: 465, // Replace with your email service provider's SMTP port
    secure: true, // Use TLS for secure connection
    auth: {
      user: 'mailserver@flyfarladies.com', // Replace with your email address
      pass: 'xnha yytx rnjc cvcl',  // Replace with your email password
    },
  });

  const mailOptions = {
    from: 'mailserver@flyfarladies.com',
    to: 'faisal@flyfar.tech, afridi@flyfar.tech',
    subject: subject,
    text: body,
    attachments: [
      {
        filename: `Dainly_New _User_Registration_Report${new Date().toISOString().slice(0, 10)}.xlsx`,
        content: attachmentBuffer,
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

const fetchNewUsers = async () => {
  const [rows] = await pool.query(
    `SELECT id, name, email, phone, profession, nationality, gender, platform 
     FROM user 
     WHERE joinAt >= CURDATE() - INTERVAL 1 DAY`
  );
  return rows;
};


const fetchAndSendReport = async () => {
  try {
    const newUsers = await fetchNewUsers();
    const buffer = generateExcelReportBuffer(newUsers);
    sendEmailWithAttachment(
      'Dainly New User Registration Report',
      'Please find the attached daily report of newly registered users.',
      buffer
    );
  } catch (error) {
    console.error('Error generating report', error);
  }
};

const getPackageVisitors = async (days, res) => {

  try {
    const currentDateFormatted = moment().format('dddd, MMMM D, YYYY');

    // SQL query to match the formatted date part
    const query = `
      SELECT * 
      FROM packagevisitor
      WHERE DATE_FORMAT(STR_TO_DATE(visitedat, '%W, %M %e, %Y at %r'), '%W, %M %e, %Y') = ?
    `;
    // Execute the query
    const [visitors] = await pool.query(query, [currentDateFormatted]);
    return visitors;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


const fetchAndSendPackageVisitorsReport = async (days, email) => {
  try {
    const visitors = await getPackageVisitors(days);
    const buffer = generateExcelReportBuffer(visitors);
    sendEmailWithvisitorAttachment(
      `Package Visitors Report - Last ${days} Days`,
      'Please find the attached report of package visitors.',
      buffer,
      email
    );
  } catch (error) {
    console.error('Error generating or sending report:', error);
  }
};

const fetchAndSendPackagebookingReport = async ( email) => {
  try {
    const bookings = await getBookingsByToday();
    const buffer = generateExcelReportBuffer(bookings);
    sendEmailWithvisitorAttachment(
      `Daily booking Report`,
      'Please find the attached report of package visitors.',
      buffer,
      email
    );
  } catch (error) {
    console.error('Error generating or sending report:', error);
  }
};


const getTodayBookings = (bookings) => {
  const today = moment().startOf('day'); // Get the start of today
  return bookings.filter(booking => {
      // Parse the booking date using Moment.js and check if it's today
      const bookingDate = moment(booking.bookingDate, 'dddd, MMMM D, YYYY [at] h:mm:ss A');
      return bookingDate.isSame(today, 'day');
  });
};


const getBookingsByToday = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM booking');

    const today = moment().startOf('day');
    const todayBookings = rows.filter(booking => {
      const bookingDate = moment(booking.bookingDate, 'dddd, MMMM D, YYYY [at] h:mm:ss A');
      return bookingDate.isSame(today, 'day');
    });

    const filteredBookings = todayBookings.map(booking => ({
      userid: booking.userid,
      email: booking.email,
      name: booking.name,
      bookingStatus:booking.bookingStatus,
      paymentStatus:booking.paymentStatus,
      totalAdultprice:booking.totalAdultprice,
      totalChildprice:booking.totalChildprice,
      totalInfantprice: booking.totalInfantprice,
      phone:booking.phone,
      bookingid:booking.bookingid,
      totaladult:booking.totaladult,
      totalinfant:booking.totalinfant,
      totalchild:booking.totalchild,
      totalAmount:booking.totalAmount,
      wallet: booking.wallet,
      packageID: booking.PkID,
      MainTitle: booking.MainTitle,
      StartDate: booking.StartDate,
      EndDate: booking.EndDate,
      TripType: booking.TripType,
      TotalDuration: booking.TotalDuration,
      booking_money: booking.booking_money,
      first_installment: booking.first_installment,
      second_installment: booking.second_installment,
      booking_money_due_date: booking.booking_money_due_date,
      first_installment_due_date: booking.first_installment_due_date,
      second_installment_due_date: booking.second_installment_due_date,
      bookingDate:booking.bookingDate,
      cashbackamount: booking.cashbackamount,
      platform:booking.platform

    }));

    return filteredBookings;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
};





const sendEmailWithvisitorAttachment = (subject, body, attachmentBuffer, toEmail) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your email service provider's SMTP host
    port: 465, // Replace with your email service provider's SMTP port
    secure: true, // Use TLS for secure connection
    auth: {
      user: 'mailserver@flyfarladies.com', // Replace with your email address
      pass: 'xnha yytx rnjc cvcl',  // Replace with your email password
    },
  });

  const mailOptions = {
    from: 'mailserver@flyfarladies.com',
    to: toEmail,
    subject: subject,
    text: body,
    attachments: [
      {
        filename: `Daily_Package_Vist Report${new Date().toISOString().slice(0, 10)}.xlsx`,
        content: attachmentBuffer,
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

// Schedule task to run at midnight every day
cron.schedule('0 0 * * *', () => {
  fetchAndSendReport();
});

// Schedule task to run every 1 minute for testing purposes
cron.schedule('0 0 * * *', () => {
  fetchAndSendReport();
});

cron.schedule('0 0 * * *', () => {
  fetchAndSendPackagebookingReport('faisal@flyfar.tech, afridi@flyfar.tech, ceo@flyfar.org,ceo@flyfarint.com, ratul@flyfarint.com');
});


// Schedule task to run every day
cron.schedule('0 0 * * *', () => {
  // Send report for the last 1 day
  fetchAndSendPackageVisitorsReport(1, 'faisal@flyfar.tech, afridi@flyfar.tech,ceo@flyfar.org, ceo@flyfarint.com,ratul@flyfarint.com');
});


const dailypackagevisitor =async(req,res)=>{
 fetchAndSendPackageVisitorsReport(1, 'faisal@flyfar.tech, afridi@flyfar.tech,ceo@flyfar.org, ceo@flyfarint.com,ratul@flyfarint.com');
 res.status(200).send('Report fetched and sent');
}


const dailynewUser =async(req,res)=>{
  fetchAndSendReport();
  res.status(200).send('Report fetched and sent');
 }


 const dailynewBooking =async(req,res)=>{
  fetchAndSendPackagebookingReport('faisal@flyfar.tech, afridi@flyfar.tech, ceo@flyfar.org,ceo@flyfarint.com, ratul@flyfarint.com');
  res.status(200).send('Report fetched and sent');
 }



export const reportService = {

  dailynewUser,
  dailypackagevisitor,
  dailynewBooking
};
