
import jwt from "jsonwebtoken";
import pool from "../../database/db";



const generateUserId = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return 'FFLU' + Math.floor(Math.random() * 10000);
};

const TravellerId = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return 'T' + Math.floor(Math.random() * 10000);
};

const Register = async (req, res) => {
  try {
    // Extract the data from the request body
    const { name, phone, email, password, platform, } = req.body;

    // Do some validation on the data
    if (!name || !email || !password || !phone || !platform) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the email already exists
    const [existingUser] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Generate user ID
    const id = generateUserId()

    // Create a new user object with the provided data
    const newUser = { id, name, phone, email, password };

    const joinAt = new Date()
    // Save the new user to the database
    const [result] = await pool.query('INSERT INTO user (id, name, phone, email, password, platform, joinAt) VALUES (?, ?, ?, ?,?,?,?)', [
      newUser.id,
      newUser.name,
      newUser.phone,
      newUser.email,
      newUser.password,
      newUser.platform,
      newUser.joinAt
    ]);

    console.log('User created successfully');
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Error creating user' });
  }
}


const login = async (req, res) => {
  try {
    // Extract the data from the request body
    const { email, password } = req.body;

    // Do some validation on the data
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the user exists with the provided email and password
    const [user] = await pool.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password]);

    if (user.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user[0].id, email: user[0].email }, 'helloladies', { expiresIn: '1h' });

    // Update the user table with the token 
    await pool.query('UPDATE user SET token = ? WHERE id = ?', [token, user[0].id]);
    console.log('User login successful');
    res.status(200).json({status:'success',  message: 'Login successful', user: user[0], token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Error during login' });
  }
}

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const imageUrl = req.publicImageLink;
    console.log(id);
    const { email, password, phone, userType, dob, gender, isactive, profession, nationality, nid, passportNumber, passportExpireDate, facebookId, whatsApp, linkedIn } = req.body;

    const result = await pool.query('UPDATE user SET email = ?, password = ?, phone = ?, userType = ?, dob = ?, gender = ?, isactive = ?, profession = ?, national = ?, nid = ?, passportNumber = ?, passportExpireDate = ?, facebookId = ?, whatsApp = ?, linkedIn = ?, profilePhoto =? WHERE id = ?', [email, password, phone, userType, dob, gender, isactive, profession, nationality, nid, passportNumber, passportExpireDate, facebookId, whatsApp, linkedIn,imageUrl, id]);
    console.log('User updated successfully');
    return res.status(200).send({ status: "success", message: "User updated successfully" });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
}


const userdashBoard = async(req,res) =>{

  try {
    const id = req.params.id
    const userQuery = `SELECT * FROM user WHERE id=?`
    const [result] = await pool.query(userQuery, [id])
    return result;
  } catch (error) {
    console.log(error);
  }
}


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
        pax_type
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


const updateTraveler = async (req, res) => {
  try {
    const partnerId = req.params.partnerId;
    const image = req.publicImageLink;
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
      pax_type
    } = req.body;

    const query = `
      UPDATE travel_partners 
      SET 
        first_name = ?,
        last_name = ?,
        gender = ?,
        dob = ?,
        nationality = ?,
        passport_copy = ?,
        passport_number = ?,
        passport_ex_date = ?,
        email = ?,
        phone = ?,
        pax_type = ?
      WHERE partnerId = ?
    `;

    const values = [
      first_name,
      last_name,
      gender,
      dob,
      nationality,
      image,
      passport_number,
      passport_ex_date,
      email,
      phone,
      pax_type,
      partnerId
    ];

    console.log(values);
    const [results] = await pool.query(query, values);
    return results;
  } catch (error) {
    console.log(error);
  }
};

const myTravelerList = async (req,res)=>{
  try {
    const userid =  req.params.user_id
    const query = `SELECT * FROM travel_partners WHERE user_id = ?`
    const  [result] = await pool.query(query,[userid])
    return  result;
    
  } catch (error) {
    console.log()
    
  }
}

const deleteTraveller = async (req,res)=>{
  try {
    const partnerId =  req.params.partnerId
    const query = `DELETE FROM travel_partners WHERE  partnerId = ?`
    const  [result] = await pool.query(query,[partnerId])
    return  result;
    
  } catch (error) {
    console.log()
    
  }
}

export const UserService ={
  Register,
  login,
  updateUser,
  userdashBoard,
  addtravler,
  updateTraveler,
  myTravelerList,
  deleteTraveller
};