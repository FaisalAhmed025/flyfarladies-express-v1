import { json } from "express";
import pool from "../database/db";

const addpopUp = async(req,res) =>{
  const { title, isActive} = req.body;
  let imageUrl;
     imageUrl =  req.imageLink
  const query = `
    INSERT INTO popup (title, isActive,file)
    VALUES (?, ?,?)
  `;
  
  const values = [title, isActive, imageUrl];

  try {
    await pool.query(query, values);
    res.status(200).json({ status: 'success', message: 'pop up added created successfully' });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ status: 'error', message: 'An error occurred while creating blog' });
  }

}


const Subscription = async(req,res) =>{
  const {Email} = req.body;
  const query = `
    INSERT INTO subscription (Email, Date)
    VALUES (?,?)
  `;
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
  const values = [Email, formattedDate];

  try {
    await pool.query(query, values);
    res.status(200).json({ status: 'success', message: 'Thanks for your subscription' });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ status: 'error', message: 'An error occurred while creating blog' });
  }

}



const updatePopup = async (req, res) => {
  const id = req.params.id
  const { title, isActive } = req.body;

  const updatedvalue  ={
    title, isActive 
  }
  if(req.publicImageLink) updatedvalue.file = req.publicImageLink
  const updateQuery = `UPDATE popup SET ? WHERE id=?`;

  try {
    await pool.query(updateQuery, [updatedvalue, id]);
    res.status(200).json({ status: 'success', message: 'Popup updated successfully' });
  } catch (error) {
    console.error('Error updating popup:', error);
    res.status(500).json({ status: 'error', message: 'An error occurred while updating popup' });
  }
};

const getpopupimage =  async(req,res) =>{
  const blogquery = `SELECT * from popup`
  const [data]  = await pool.query(blogquery)
  return res.send(data)
  
}


const deletepopup = async (req, res) => {
  const id = req.params.id
  const deletequery = `DELETE FROM popup WHERE id= ?`
  await pool.query(deletequery, [id])

  return res.status(200).json({
    status: true,
    message: 'image has removed'
  })
}






export const blogPopUp ={
  addpopUp,
  getpopupimage,
  updatePopup,
  Subscription,
  deletepopup
  
 
}