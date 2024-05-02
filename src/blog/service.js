import { json } from "express";
import pool from "../database/db";




const addBlog = async(req,res) =>{

  const { Title, Description, Blogfor, WrittenBy, Type } = req.body;
  let imageUrl;

  if (req.files.coverimage) {
      // Handle each image here, upload to S3 or save locally
      // Example: const imageUrl = await uploadImageToS3(req.files.blogimages[i]);
     imageUrl =  req.imageLink

  }


  let secondurl;
  if (req.files.secondimage) {
    // Handle second image here
    // Example: const secondImageUrl = await uploadImageToS3(req.files.secondimage[0]);
    secondurl =  req.imageLink
  }

  const query = `
    INSERT INTO blogs (Title, Description, Blogfor, WrittenBy, Type, blogimages, secondimage)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [Title, Description, Blogfor, WrittenBy, Type, imageUrl, secondurl];

  try {
    await pool.query(query, values);
    res.status(200).json({ status: 'success', message: 'blog created successfully' });
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


const updateBlogImage = async (req, res) => {
  try {
    const id = req.params.id;
    const urlid = req.params.urlid;
    const newImageUrl = req.publicImageLink;

    const [blog] = await pool.query('SELECT * FROM blogs WHERE id = ?', [id])

    if (blog.length === 0) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    let blogData = blog[0];
    const blogimages = blogData.blogimages;

    for( let i=0; i<blogimages.length; i++){
      const image = blogimages[i]
      console.log(image)
       if(image.urlid === Number(urlid)){
        console.log('now')
        blogimages[i].url = newImageUrl;
       }

      }
      console.log({blogimages})
    
    const [data]  =await pool.query('UPDATE blogs SET blogimages = ? WHERE id = ?', [JSON.stringify(blogimages), id]);

    console.log(data)
    return res.status(200).json({ status: 'success', message: 'Image URL updated successfully' });
  } catch (error) {
    console.error('Error updating image URL:', error);
    return res.status(500).json({ status: 'error', message: 'An error occurred while updating image URL' });
  }
};


export const blogService ={
  addBlog,
  getallblogs,
  deleteBlog,
  updateBlog,
  updateBlogImage
}