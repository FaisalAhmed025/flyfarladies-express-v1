import pool from "../database/db";




const addBlog = async(req,res) =>{

  const { Title, Description, Blogfor, WrittenBy, Type } = req.body;
  const blogimages = [];
  if (req.files.blogimages) {
    for (let i = 0; i < req.files.blogimages.length; i++) {
      // Handle each image here, upload to S3 or save locally
      // Example: const imageUrl = await uploadImageToS3(req.files.blogimages[i]);
      const imageUrl =  req.imageLink
      const imageId = i+1// Assuming you have an id for each image
      blogimages.push({ id: imageId, url: imageUrl });
    }
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


  const values = [Title, Description, Blogfor, WrittenBy, Type, JSON.stringify(blogimages), secondurl];


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

const updateimage =  async (req,res) =>{
  const id = req.params.id
  const blogsquery  = `SELECT * FROM blogs WHERE id=?`

  const [data] = await pool.query(blogsquery, id)

  console.log(data)
}

const updateBlogImage = async (req, res) => {
  const id = req.params.id

  try {
    const [blog] = await pool.query('SELECT blogimages FROM blogs WHERE id = ?', [id]);
    console.log(blog)
  
    if (blog.length === 0) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const blogimages = JSON.parse(blog[0].blogimages);

    const imageIndex = blogimages.findIndex(image => image.id === id);

    if (imageIndex === -1) {
      return res.status(404).json({ message: 'Image not found in the blog' });
    }

    blogimages[imageIndex].url = req.imageLink;

    await pool.query('UPDATE blogs SET blogimages = ? WHERE id = ?', [JSON.stringify(blogimages), id]);

   return res.status(200).json({ status: 'success', message: 'Image URL updated successfully' });
  } catch (error) {
    console.error('Error updating image URL:', error);
    res.status(500).json({ status: 'error', message: 'An error occurred while updating image URL' });
  }
};






export const blogService ={
  addBlog,
  getallblogs,
  deleteBlog,
  updateimage,
  updateBlogImage
}