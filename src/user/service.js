import jwt from "jsonwebtoken";
import pool from "../database/db";

import { object, string, date, boolean } from "zod";
import { HttpException } from "express-sharp";
import httpStatus from "http-status";

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
    const { name, phone, email, password, platform } = req.body;

    // Do some validation on the data
    if (!name || !email || !password || !phone || !platform) {
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

    // Create a new user object with the provided data
    const newUser = { id, name, phone, email, password, platform, joinAt };

    const joinAt = new Date();
    console.log(joinAt);
    // Save the new user to the database
    const [result] = await pool.query(
      "INSERT INTO user (id, name, phone, email, password, platform, joinAt) VALUES (?, ?, ?, ?,?,?,?)",
      [
        newUser.id,
        newUser.name,
        newUser.phone,
        newUser.email,
        newUser.password,
        newUser.platform,
        joinAt,
      ]
    );

    console.log("User created successfully");
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
    return res.status(403).json({ message: "No token provided." });
  }
  console.log("Received token:", token);
  jwt.verify(token, "helloladies", (err, decoded) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(401).json({ message: "Failed to authenticate token." });
    }
    console.log("Decoded token payload:", decoded);
    req.user = decoded.id;

    console.log("who m i?", req.user);
    next();
  });
}

const login = async (req, res) => {
  try {
    // Extract the data from the request body
    const { email, password } = req.body;
    // Do some validation on the data
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if the user exists with the provided email and password
    const [user] = await pool.query(
      "SELECT * FROM user WHERE email = ? AND password = ?",
      [email, password]
    );

    console.log(user);

    if (user.length === null) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      "helloladies",
      { expiresIn: "1h" }
    );

    console.log(token);

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

// Define a schema for the request body
const userSchema = object({
  nameTitle:string(),
  name: string(),
  firstName:string(),
  lastName:string(),
  email: string().email(),
  password: string(),
  phone: string(),
  userType: string(),
  dob: date(),
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
    if(result.length ===0){
      throw new HttpException('no traveler list', httpStatus.BAD_REQUEST)
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

export const UserService = {
  Register,
  login,
  updateUser,
  userdashBoard,
  addtravler,
  updateTraveler,
  myTravelerList,
  deleteTraveller,
};
