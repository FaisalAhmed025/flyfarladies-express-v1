import httpStatus from "http-status";
import pool from "../database/db";
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';

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

const getPackageVisitors = async (days) => {
  const packageQuery = `
    SELECT * FROM packagevisitor
    WHERE DATEDIFF(CURDATE(), STR_TO_DATE(visitedat, '%W, %M %e, %Y at %r')) <= ?
    ORDER BY STR_TO_DATE(visitedat, '%W, %M %e, %Y at %r') DESC
  `;

  try {
    const [visitors] = await pool.execute(packageQuery, [days]);
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
// cron.schedule('0 0 * * *', () => {
//   fetchAndSendReport();
// });

// Schedule task to run every 1 minute for testing purposes
cron.schedule('*/30 * * * *', () => {
  fetchAndSendReport();
});


// Schedule task to run every day
cron.schedule('*/1 * * * *', () => {
  // Send reports for the last 1, 7, and 30 days
  fetchAndSendPackageVisitorsReport(1, 'faisal@flyfar.tech, tarek@flyfar.tech, afridi@flyfar.tech');
  // fetchAndSendPackageVisitorsReport(7, 'faisal@flyfar.tech, tarek@flyfar.tech,afridi@flyfar.tech');
  // fetchAndSendPackageVisitorsReport(30, 'faisal@flyfar.tech,tarek@flyfar.tech,afridi@flyfar.tech');
});

export const reportService = {
  fetchNewUsers,
};
