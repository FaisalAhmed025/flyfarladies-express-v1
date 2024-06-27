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


const AllLedger = async (req, res) => {
  const ledgerQuery = `SELECT * FROM ledger  ORDER BY uid DESC`
  const [data] = await pool.query(ledgerQuery)
  return res.status(200).json({
    success: true,
    status: httpStatus.OK,
    data: data
  });
}

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
    to: 'ceo@flyfar.org, coo@flyfar.org, shornali@flyfarladies.com',
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


const getuserforoneday = async (days, res) => {

  try {
    const currentDateFormatted = moment().format('dddd, MMMM D, YYYY');

    // SQL query to match the formatted date part
    const query = `
      SELECT * 
      FROM user
      WHERE DATE_FORMAT(STR_TO_DATE(joinAt, '%W, %M %e, %Y at %r'), '%W, %M %e, %Y') = ?
    `;
    // Execute the query
    console.log(query)
    const [users] = await pool.query(query, [currentDateFormatted]);
    return  res.json(users);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


const getPackageVisitorsByLast12Hours = async () => {
  try {
    // Calculate the timestamp 12 hours ago
    const twelveHoursAgo = moment().subtract(12, 'hours').format('YYYY-MM-DD HH:mm:ss');

    // SQL query to fetch visitors within the last 12 hours
    const query = `
      SELECT * 
      FROM packagevisitor
      WHERE visitedat >= ?
    `;
    
    // Execute the query
    const [visitors] = await pool.query(query, [twelveHoursAgo]);
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

const fetchAndSendPackageVisitorsReporthalfday = async (email) => {
  try {
    const visitors = await getPackageVisitorsByLast12Hours();
    const buffer = generateExcelReportBuffer(visitors);
    sendEmailWithvisitorAttachment(
      `Package Visitors Report - Last 12 hours`,
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

//get last one day user

const getuserLast1Day = async (req, res) => {
await  getuserforoneday(1,res)
  
}




const getUserLast7Days = async (req, res) => {
  try {
    let usersData = [];

    for (let i = 0; i <7; i++) {
      const day = moment().subtract(i, 'days').format('YYYY-MM-DD');
      console.log(day)

      const query = `
        SELECT * 
        FROM user
        WHERE joinAt = ?;
      `;

      // Execute the query for each day
      const [users] = await pool.query(query, [day]);

      usersData.push({ day, users });
    }

    res.status(200).json(usersData);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching data');
  }
}

const getUserLast30Days = async (req, res) => {
  try {
    let usersData = [];

    for (let i = 0; i <30; i++) {
      const day = moment().subtract(i, 'days').format('YYYY-MM-DD');
      console.log(day)

      const query = `
        SELECT * 
        FROM user
        WHERE joinAt = ?;
      `;

      // Execute the query for each day
      const [users] = await pool.query(query, [day]);

      usersData.push({ day, users });
    }

    res.status(200).json(usersData);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching data');
  }
}



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
        filename: `Package_Vist Report${new Date().toISOString().slice(0, 10)}.xlsx`,
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


const dailypackagevisitor =async(req,res)=>{
 fetchAndSendPackageVisitorsReport(1, 'orpita@flyfarladies.com,shornali@flyafrladies.com, afridi@flyfar.tech,ceo@flyfar.org, ceo@flyfarint.com,ratul@flyfarint.com');
 res.status(200).send('Report fetched and sent');
}


const dailynewUser =async(req,res)=>{
  fetchAndSendReport();
  res.status(200).send('Report fetched and sent');
 }


 const dailynewBooking =async(req,res)=>{
  fetchAndSendPackagebookingReport('orpita@flyfarladies.com,shornali@flyafrladies.com, afridi@flyfar.tech, ceo@flyfar.org,ceo@flyfarint.com, ratul@flyfarint.com');
  res.status(200).send('Report fetched and sent');
 }

 const getBookingsByLast12Hours = async (req,res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM booking');

    const twelveHoursAgo = moment().subtract(12, 'hours');
    const now = moment();
    const twelveHourBookings = rows.filter(booking => {
      const bookingDate = moment(booking.bookingDate, 'dddd, MMMM D, YYYY [at] h:mm:ss A');
      return bookingDate.isBetween(twelveHoursAgo, now);
    });

    const filteredBookings = twelveHourBookings.map(booking => ({
      userid: booking.userid,
      email: booking.email,
      name: booking.name,
      bookingStatus: booking.bookingStatus,
      paymentStatus: booking.paymentStatus,
      totalAdultprice: booking.totalAdultprice,
      totalChildprice: booking.totalChildprice,
      totalInfantprice: booking.totalInfantprice,
      phone: booking.phone,
      bookingid: booking.bookingid,
      totaladult: booking.totaladult,
      totalinfant: booking.totalinfant,
      totalchild: booking.totalchild,
      totalAmount: booking.totalAmount,
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
      bookingDate: booking.bookingDate,
      cashbackamount: booking.cashbackamount,
      platform: booking.platform
    }));

    return  res.send({filteredBookings});
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
};


const sendEmailWithhalfday = (subject, body, attachmentBuffer, toEmail) => {
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
        filename: `last_12_hours_Package_Vist Report${new Date().toISOString().slice(0, 10)}.xlsx`,
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


const halfdaypackagevisit = async(req,res)=>{
  await fetchAndSendPackageVisitorsReporthalfday('faisal@flyfar.tech');
  res.status(200).send('Report fetched and sent');
}



export const reportService = {
  AllLedger,
  dailynewUser,
  dailypackagevisitor,
  dailynewBooking,
  getuserLast1Day,
  getUserLast7Days,
  getUserLast30Days,
  getBookingsByLast12Hours,
  halfdaypackagevisit
};
