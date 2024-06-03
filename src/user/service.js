import jwt from "jsonwebtoken";
import pool from "../database/db";
import { object, string, date, boolean } from "zod";
import { HttpException } from "express-sharp";
import httpStatus from "http-status";
import crypto from 'crypto'
import nodemailer from 'nodemailer'

const generateUserId = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "FFLU" + Math.floor(Math.random() * 10000);
};
const TravellerId = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "T" + Math.floor(Math.random() * 10000);
};


const Register = async (req, res) => {
  try {
    // Extract the data from the request body
    const { name, phone, email, password, platform, device } = req.body;
    // Do some validation on the data

    if (!name || !email || !password || !platform) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if the email already exists
    const [existingUser] = await pool.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Generate user ID
    const id = generateUserId();

    // Hash the password
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Create a new user object with the provided data
    const newUser = { id, name, phone, email, device, password: hashedPassword, platform };

    const joinAt = new Date();
    console.log(joinAt);
    // Save the new user to the database
    const [result] = await pool.query(
      "INSERT INTO user (id, name, phone, email, password, platform, device, joinAt) VALUES (?, ?, ?,?, ?,?,?,?)",
      [
        newUser.id,
        newUser.name,
        newUser.phone,
        newUser.email,
        newUser.password,
        newUser.platform,
        newUser.device,
        joinAt,
      ]
    );

    console.log("User created successfully");

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Replace with your email service provider's SMTP host
      port: 465, // Replace with your email service provider's SMTP port
      secure: true, // Use TLS for secure connection
      auth: {
        user: 'mailserver@flyfarladies.com', // Replace with your email address
        pass: 'xnha yytx rnjc cvcl',  // Replace with your email password
      },
    });

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

    const formattedDate = date.toLocaleString('en-BD', options);

    const mailOptions = {
      from: 'mailserver@flyfarladies.com', // Replace with your email address
      to: email, // Recipient's email address
      subject: 'Welcome To Fly Far Ladies',
      text: 'Congrats! your Registration has been Completed ',
      html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Deposit Request</title>
          </head>
          <body>
            <div style="width: 700px; height: 100vh; margin: 0 auto">
              <div style="width: 700px; height: 70px; background: #fe99a6">
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  align="center"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    padding: 0;
                    width: 700px;
                  "
                >
                  <tr>
                    <td
                      align="center"
                      valign="top"
                      style="
                        border-collapse: collapse;
                        border-spacing: 0;
                        color: #ffffff;
                        font-family: sans-serif;
                        font-size: 15px;
                        line-height: 38px;
                        padding: 20px 0 20px 0;
                        text-transform: uppercase;
                        letter-spacing: 5px;
                      "
                    >
                      Welcome to Fly Far ladies
                    </td>
                  </tr>
                </table>
        
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  align="center"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    padding: 0;
                    width: 700px;
                  "
                >
                  <tr>
                    <td
                      valign="top"
                      style="
                        background-color: #efefef;
                        border-collapse: collapse;
                        border-spacing: 0;
                        color: #584660;
                        font-family: sans-serif;
                        font-size: 30px;
                        font-weight: 500;
                        line-height: 38px;
                        padding: 20px 40px 0px 55px;
                      "
                    >
                      ${name}
                    </td>
                  </tr>
                  <tr>
                    <td
                      valign="top"
                      style="
                        background-color: #efefef;
                        border-collapse: collapse;
                        border-spacing: 0;
                        color: #bc6277;
                        font-family: sans-serif;
                        font-size: 17px;
                        font-weight: 500;
                        line-height: 38px;
                        padding: 0px 40px 20px 55px;
                      "
                    >
                    ${formattedDate}
                    </td>
                  </tr>
                </table>
        
                <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                align="center"
                style="
                  border-collapse: collapse;
                  border-spacing: 0;
                  padding: 0;
                  width: 700px;
                  background: #ffffff"
                "
              >
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="
                      border-collapse: collapse;
                      border-spacing: 0;
                      /* color: #BC6277; */
                      color: #584660;
        
                      font-weight: 600;
                      font-family: sans-serif;
                      font-size: 15px;
                      line-height: 38px;
                      padding: 20px 0 20px 0;
                    "
                  >
          
                  </td>
                </tr>
              </table>
        
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  align="center"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    padding: 0;
                    width: 620px;
                    background-color: #ffffff;
                  "
                >
                  <tr>
                    <td
                      valign="top"
                      style="
                        border-collapse: collapse;
                        border-spacing: 0;
                        color: #bc6277;
                        font-family: sans-serif;
                        font-size: 15px;
                        font-weight: 600;
                        line-height: 38px;
                        padding: 10px 20px 5px 20px;
                      "
                    >
                      User Details
                    </td>
                  </tr>
        
                  <tr style="border-bottom: 1px solid #dfdfdf">
                    <td
                      valign="top"
                      style="
                        border-collapse: collapse;
                        border-spacing: 0;
                        color: #767676;
                        font-family: sans-serif;
                        font-size: 14px;
                        font-weight: 500;
                        line-height: 38px;
                        padding: 5px 20px;
                        width: 180px;
                      "
                    >
                      Username
                    </td>
                    <td
                      valign="top"
                      style="
                        border-collapse: collapse;
                        border-spacing: 0;
                        color: #767676;
                        font-family: sans-serif;
                        font-size: 14px;
                        font-weight: 500;
                        line-height: 38px;
                        padding: 5px 20px;
                      "
                    >
                      ${name}
                    </td>
                  </tr>
                  <tr style="border-bottom: 1px solid #dfdfdf">
                    <td
                      valign="top"
                      style="
                        border-collapse: collapse;
                        border-spacing: 0;
                        color: #767676;
                        font-family: sans-serif;
                        font-size: 14px;
                        font-weight: 500;
                        line-height: 38px;
                        padding: 5px 20px;
                        width: 180px;
                      "
                    >
                      Password
                    </td>
                    <td
                      valign="top"
                      style="
                        border-collapse: collapse;
                        border-spacing: 0;
                        color: #767676;
                        font-family: sans-serif;
                        font-size: 14px;
                        font-weight: 500;
                        line-height: 38px;
                        padding: 5px 20px;
                      "
                    >
                      ${password}
                    </td>
                  </tr>
                </table>
        
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  align="center"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    padding: 0;
                    width: 670px;
                    background-color: #702c8b;
                    margin-top: 25px;
                    text-align: center;
                    color: #ffffff !important;
                    text-decoration: none !important;
                  "
                >
                  <tr>
                    <td
                      valign="top"
                      style="
                        border-collapse: collapse;
                        border-spacing: 0;
                        font-family: sans-serif;
                        font-size: 16px;
                        font-weight: 500;
                        padding: 20px 20px 0px 20px;
                      "
                    >
                      Need more help?
                    </td>
                  </tr>
        
                  <tr>
                    <td
                      valign="top"
                      style="
                        border-collapse: collapse;
                        border-spacing: 0;
                        font-family: sans-serif;
                        font-size: 12px;
                        font-weight: 500;
                        line-height: 38px;
                        padding: 0px 20px 10px 20px;
                      "
                    >
                      Mail us at
                      <span style="color: #ffffff !important; text-decoration: none"
                        >support@flyfarladies.com</span
                      >
                      or Call us at +88 01755582111
                    </td>
                  </tr>
                </table>
        
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  align="left"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    padding: 0;
                    width: 420px;
                    color: #ffffff;
                  "
                >
                  <tr>
                    <td
                      valign="top"
                      style="
                        border-collapse: collapse;
                        border-spacing: 0;
                        font-family: sans-serif;
                        font-size: 13px;
                        font-weight: 600;
                        padding: 20px 0px 0px 45px;
                        color: #767676;
                      "
                    >
                      <a
                        style="padding-right: 20px; color: #584660"
                        href="https://www.flyfarladies.com/termsandcondition"
                        >Terms & Conditions</a
                      >
        
                      <a
                        style="padding-right: 20px; color: #584660"
                        href="https://www.flyfarladies.com/bookingpolicy"
                        >Booking Policy</a
                      >
        
                      <a
                        style="padding-right: 20px; color: #584660"
                        href="https://www.flyfarladies.com/privacypolicy"
                        >Privacy Policy</a
                      >
                    </td>
                  </tr>
                </table>
        
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    border-collapse: collapse;
                    border-spacing: 0;
                    width: 700px;
                    color: #702c8b;
                    margin-top: 85px;
                  "
                >
                  <tr>
                    <td style="padding-left: 45px">
                      <img
                        style="padding-right: 5px"
                        src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png"
                        href="https://www.facebook.com/flyfarladies/?ref=page_internal"
                        alt=""
                      />
                      <img
                        style="padding-right: 5px"
                        src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png"
                        href="https://www.linkedin.com/company/fly-far-ladies/"
                        alt=""
                      />
                      <img
                        style="padding-right: 5px"
                        src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png"
                        href="https://wa.me/+88 01755582111"
                        alt=""
                      />
                    </td>
                  </tr>
        
                  <tr>
                    <td
                      style="
                        border-collapse: collapse;
                        border-spacing: 0;
                        font-family: sans-serif;
                        font-size: 13px;
                        font-weight: 500;
                        padding: 5px 0px 0px 45px;
                        color: #767676;
                        padding-bottom: 2px;
                      "
                    >
                      Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.
                    </td>
        
                    <td
                      style="
                        border-collapse: collapse;
                        border-spacing: 0;
                        font-family: sans-serif;
                        font-weight: 500;
                        color: #767676;
                        padding-bottom: 20px;
                      "
                    >
                      <img
                        width="100px"
                        src="https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png"
                        href="https://www.flyfarladies.com/"
                        alt=""
                      />
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </body>
        </html>
        `

    }
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
    ;

    return (
      result &&
      res.status(200).send({
        success: true,
        message: "Register successfully",
        data: result,
      })
    );
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Error creating user" });
  }
};

export function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  console.log(token);
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      status: httpStatus.UNAUTHORIZED,
      error: "Unauthorized",
      message: "Please log in",
    });
  }
  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, "helloladies");
    // Check if the user exists in your database using the decoded token information
    const user = decoded.id; // Replace with your actual function to fetch the user by ID
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        status: httpStatus.UNAUTHORIZED,
        error: "Unauthorized",
        message: "User not found",
      });
    }

    // Attach the user information to the request object
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ error: "Token is invalid" });
    } else if (err.name === "TokenExpiredError") {
      return res.status(403).json({ error: "Token has expired" });
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
export default verifyToken;


const login = async (req, res) => {
  try {
    // Extract the data from the request body
    const { email, password } = req.body;
    // Do some validation on the data
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Hash the password to compare with the stored hashed password
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Check if the user exists with the provided email and hashed password
    const [user] = await pool.query(
      "SELECT * FROM user WHERE email = ? AND password = ?",
      [email, hashedPassword]
    );
    if (user.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // if (user.isactive == 0) {
    //   return res.status(401).json({ error: " your id has been deactivated" });
    // }


    // Generate JWT token
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      "helloladies",
      { expiresIn: "15d" }
    );

    // Update the user table with the token
    await pool.query("UPDATE user SET token = ? WHERE id = ?", [
      token,
      user[0].id,
    ]);
    console.log("User login successful");
    return res.status(200).json({
      status: "success",
      message: "Login successful",
      user: user[0],
      token,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Error during login" });
  }
};



const loginwithGoogle = async (req, res) => {
  try {
    // Extract the data from the request body
    const { email } = req.body;
    // Do some validation on the data
    if (!email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Hash the password to compare with the stored hashed password
    // const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Check if the user exists with the provided email and hashed password
    const [user] = await pool.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if(user[0].platform ==='manual'){
      return res.status(401).json({ message: "You registered  manually, please try to login  manually" });
    }

    if(user[0].platform ==='facebook'){
      return res.status(401).json({ message: " you registered with facebook,please login  with facebook" });
    }

    if(user[0].platform ==='google'){ 
    // Generate JWT token
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      "helloladies",
      { expiresIn: "15d" }
    );

    // Update the user table with the token
    await pool.query("UPDATE user SET token = ? WHERE id = ?", [
      token,
      user[0].id,
    ]);
    console.log("User login successful");
    return res.status(200).json({
      status: "success",
      message: "Login successful",
      user: user[0],
      token,
    });

    }

  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Error during login" });
  }
};



const loginwithfacebook = async (req, res) => {
  try {
    // Extract the data from the request body
    const { email } = req.body;
    // Do some validation on the data
    if (!email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Hash the password to compare with the stored hashed password
    // const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Check if the user exists with the provided email and hashed password
    const [user] = await pool.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if(user[0].platform ==='manual'){
      return res.status(401).json({ message: "you registered with manually,please login manually" });
    }

    if(user[0].platform ==='google'){
      return res.status(401).json({ message: "you register with google, please login  with google" });
    }

    if(user[0].platform ==='facebook'){ 
    // Generate JWT token
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      "helloladies",
      { expiresIn: "15d" }
    );

    // Update the user table with the token
    await pool.query("UPDATE user SET token = ? WHERE id = ?", [
      token,
      user[0].id,
    ]);
    console.log("User login successful");
    return res.status(200).json({
      status: "success",
      message: "Login successful",
      user: user[0],
      token,
    });

    }

  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Error during login" });
  }
};



// Define a schema for the request body
const userSchema = object({
  nameTitle: string(),
  name: string(),
  firstName: string(),
  lastName: string(),
  email: string().email(),
  password: string(),
  phone: string(),
  userType: string(),
  dob: string(),
  gender: string(),
  isactive: boolean(),
  profession: string(),
  nationality: string(),
  nid: string(),
  passportNumber: string(),
  passportExpireDate: string(),
  facebookId: string(),
  whatsApp: string(),
  linkedIn: string(),
}).partial();

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const table = "user";
    // Validate the request body against the schema
    req.body = userSchema.parse(req.body);

    if (req.publicImageLink) req.body.passport_copy = req.publicImageLink;

    const updateQuery = `
            UPDATE ${table}
            SET ?
            WHERE id = ?;
        `;

    // Execute the update query with the validated data
    const [updateData] = await pool.query(updateQuery, [req.body, id]);
    console.log(updateData);
    return res
      .status(200)
      .json({ status: "success", message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
};

const userdashBoard = async (req, res) => {
  try {
    const id = req.params.id;
    const userQuery = `SELECT * FROM user WHERE id=?`;
    const [result] = await pool.query(userQuery, [id]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const allUser = async (req, res) => {
  try {
    const userQuery = `SELECT * FROM user`;
    const [result] = await pool.query(userQuery,);
    return res.send({data:result});
  } catch (error) {
    console.log(error);
  }
};

const addtravler = async (req) => {
  try {
    const userid = req.params.id;
    const travelers = req.body.travelers; // Assuming req.body.travelers is an array of traveler objects
    const results = [];
    for (const traveler of travelers) {
      const partnerId = TravellerId();
      const {
        first_name,
        last_name,
        gender,
        dob,
        nationality,
        passport_number,
        passport_ex_date,
        email,
        phone,
        pax_type,
      } = traveler;

      const query = `INSERT INTO travel_partners (
        partnerId,
        user_id,
        first_name,
        last_name,
        gender,
        dob,
        nationality,
        passport_number,
        passport_ex_date,
        email,
        phone,
        pax_type
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        partnerId,
        userid,
        first_name,
        last_name,
        gender,
        dob,
        nationality,
        passport_number,
        passport_ex_date,
        email,
        phone,
        pax_type,
      ];
      const [result] = await pool.query(query, values);
      results.push(result);
    }
    return results;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const travelerSchema = object({
  first_name: string(),
  last_name: string(),
  gender: string(),
  dob: date(),
  nationality: string(),
  passport_number: string(),
  passport_ex_date: date(),
  email: string().email(),
  phone: string(),
  pax_type: string(),
}).partial();

const updateTraveler = async (req, res) => {
  try {
    const partnerId = req.params.partnerId;
    const table = "travel_partners";
    // Validate the request body against the schema
    req.body = travelerSchema.parse(req.body);
    if (req.publicImageLink) req.body.passport_copy = req.publicImageLink;
    console.log(req.publicImageLink);

    const updateQuery = `
        UPDATE ${table}
        SET ?
        WHERE partnerId = ?;
    `;

    // Execute the update query with the validated data
    const [updateData] = await pool.query(updateQuery, [req.body, partnerId]);
    return updateData;
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
};

const myTravelerList = async (req, res) => {
  try {
    const userid = req.params.user_id;
    const query = `SELECT * FROM travel_partners WHERE user_id = ?`;
    const [result] = await pool.query(query, [userid]);
    if (result.length === 0) {
       return res.send({ message:"No traveler found"});
    }
    return res.status(200).json({
      success: true,
      status: httpStatus.OK,
      data: result,
    });
  } catch (error) {
    console.log();
  }
};

const deleteTraveller = async (req, res) => {
  try {
    const partnerId = req.params.partnerId;
    const query = `DELETE FROM travel_partners WHERE  partnerId = ?`;
    const [result] = await pool.query(query, [partnerId]);
    return res.status(200).json({
      success: true,
      status: httpStatus.OK,
      data: result,
    });
  } catch (error) {
    console.log();
  }
};


const deleteUser = async (req, res) => {
  try {
    const partnerId = req.params.id;
    const query = `DELETE FROM user WHERE  id = ?`;
    console.log(partnerId)
    const [result] = await pool.query(query, [partnerId]);
    return res.status(200).json({
      success: true,
      status: httpStatus.OK,
      message:"user has deleted"
    });
  } catch (error) {
    console.log();
  }
};






const forgetpasswordResetRequest = async(req, res)=> {
  try {
    const { email } = req.body;

    // Check if the user with the provided email exists
    const [user] = await pool.query("SELECT * FROM user WHERE email = ?", [email]);
    if (user.length === 0) {
      throw new Error('User not found with this email');
    }

    // Generate a random token
    const token = crypto.randomBytes(32).toString('hex');

    // Save the token in the database
    await pool.query("INSERT INTO reset_password (email, token) VALUES (?, ?)", [email, token]);

    // Construct the password reset link
    const resetLink = `https://www.flyfarladies.com/resetpassword?token=${token}`;

    const mailOptions = {
      from: 'mailserver@flyfarladies.com', // Replace with your email address
      to: email, // Recipient's email address
      subject: 'password reset',
      text: 'please go through this link and update your password',
      html: `Click <a href="${resetLink}">here</a> to reset your password`
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Replace with your email service provider's SMTP host
      port: 465, // Replace with your email service provider's SMTP port
      secure: true, // Use TLS for secure connection
      auth: {
        user: 'mailserver@flyfarladies.com', // Replace with your email address
        pass: 'xnha yytx rnjc cvcl',  // Replace with your email password
      },
    });
    
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
    return res.status(200).json({status: 'success', token:token,  message: 'Password reset link sent successfully' });
  } catch (error) {
    console.error('Error sending password reset link:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


const resetPassword = async (req, res)=> {
  try {
    const { token, password, confirm_Password } = req.body;
    if (password !== confirm_Password) {
      throw new Error('Passwords do not match');
    }

    // Find password reset request by token
    const restequery = `SELECT * FROM reset_password WHERE token = ?`
    const [passwordReset] = await pool.query(restequery, [token]);
    if (!passwordReset) {
      throw new Error('Invalid token');
    }

    // Find user by email

    const userquery = `SELECT * FROM user WHERE email = ?`
    const [user] = await pool.query(userquery,[passwordReset[0].email] );
    if (!user) {
      throw new Error('User not found');
    }

    const userid =user[0].id

    // Hash the new password
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    // Update user's password

    await pool.query("UPDATE user SET password = ? WHERE id= ?", [hashedPassword, userid]);

    // Delete the password reset request from the database
    await pool.query("DELETE FROM reset_password WHERE token = ?", [token]);

    return res.status(200).json({ status: 'success', message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const userLedger =  async (req,res)=>{
  const userid = req.params.user_id
  const ledgerQuery = `SELECT * FROM ledger WHERE user_id =? ORDER BY uid DESC`
  const [data] = await pool.query(ledgerQuery, [userid])
  return res.status(200).json({
    success: true,
    status: httpStatus.OK,
    data:data
  });
}



const getplatform = async (req, res) => {
  // Query to get booking details along with user counts for app platform
  const getAppBookingDetailsQuery = `
  SELECT 
    device,
    COUNT(*) AS Registered_user
  FROM user
  WHERE device = 'app'
  GROUP BY device
`;

  // Query to get booking details along with user counts for desktop platform
  const getDesktopBookingDetailsQuery = `
  SELECT 
  device,
    COUNT(*) AS Registered_user
  FROM user
  WHERE device = 'website'
  GROUP BY device
`;

  // Execute the queries to get booking details with user counts for each platform
  const [getAppregisteruser] = await pool.query(getAppBookingDetailsQuery);
  const [getwebsiteregisteruser] = await pool.query(getDesktopBookingDetailsQuery);

  // Combine the results for app and desktop booking

  // Log the booking details with user counts for each platform
  return  res.send({register_by_app: getAppregisteruser,
    register_by_website: getwebsiteregisteruser})

}

export const UserService = {
  Register,
  login,
  loginwithGoogle,
  loginwithfacebook,
  deleteUser,
  forgetpasswordResetRequest,
  resetPassword,
  allUser,
  userLedger,
  updateUser,
  userdashBoard,
  addtravler,
  updateTraveler,
  myTravelerList,
  deleteTraveller,
  getplatform,
};
