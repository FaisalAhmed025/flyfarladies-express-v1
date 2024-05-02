import { json } from "express";
import pool from "../database/db";


const addpopUp = async(req,res) =>{
  const { title, isActive} = req.body;
  let imageUrl;

  if (req.files.publicImageLink) {
      // Handle each image here, upload to S3 or save locally
      // Example: const imageUrl = await uploadImageToS3(req.files.blogimages[i]);
     imageUrl =  req.publicImageLink

  }

  const query = `
    INSERT INTO popup (title, isActive,file)
    VALUES (?, ?,?)
  `;

  const values = [title, isActive, imageUrl];

  try {
    await pool.query(query, values);
    res.status(200).json({ status: 'success', message: 'pip up added created successfully' });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ status: 'error', message: 'An error occurred while creating blog' });
  }

}

const getallblogs =  async(req,res) =>{
  const blogquery = `SELECT * from blogs`
  const [data]  = await pool.query(blogquery)
  return res.send(data)
  
}


const  deleteBlog = async(req,res)=>{
  const id= req.params.id
  const deleteQuery = `DELETE  FROM blogs WHERE id=? `
  await pool.query(deleteQuery, [id])
  return res.send({status:'success', message:"blog has  deleted"})
}

const updateBlog =  async (req,res) =>{
  const id = req.params.id;
        const { Title, Description, Blogfor, WrittenBy, Type } = req.body;
        const updateBlockImage = {
            Title, Description, Blogfor, WrittenBy, Type
        };
        
  if (req.coverimage)  updateBlockImage.blogimages =   req.coverimage

  if (req.secondimage) updateBlockImage.secondimage =  req.secondimage

        const updateQuery = `UPDATE blogs SET ? WHERE id=?`;
        const [data] = await pool.query(updateQuery, [updateBlockImage, id]);
    
        // Check if any rows were affected
        if (data.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        return res.status(200).json({ success: true, message: 'Blog updated successfully' });


}



export const blogPopUp ={
  addpopUp,
  getallblogs,
  deleteBlog,
  updateBlog,
 
}