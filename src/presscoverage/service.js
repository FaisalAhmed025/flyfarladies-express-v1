import pool from "../database/db";


const addPressCoverage  = async (req,res) =>{

try {
  const {Description, date, link} =req.body
  const coverImage = req.publicImageLink;

  // Check if cover image is present
  if (!coverImage) {
    return res.status(400).json({ error: "Cover image is required" });
  }

  const values =[
  
    coverImage,
    Description,
    date,
    link
  ]
  const insertQuery= `INSERT INTO press_coverages (image, Description, date, link) VALUES(?,?,?,?)`
  const [pressResults] =  await  pool.query(insertQuery, values)
  console.log(pressResults);

  return res.status(200).json({
    status: "success",
    message: "Press coverage added successfully",
    data:pressResults
  });
  
} catch (error) {
  console.error("Error adding press coverage:", error);
    res.status(500).json({ error: "Error adding press coverag" });

}
}

const getAllPressCoverage = async (req,res) => {
  const packagequery  = `SELECT * FROM press_coverages`
  console.log(packagequery)
  const [results] = await pool.execute(packagequery)
  return res.status(200).json({
    status: "success",
    data:results
  });
}

const updatepressCoverage = async (req, res) => {
  try {
    const id = req.params.id;
    const { Description, date, link } = req.body;
    const updateBlockImage = {
      Description, date, link
  };
  
  if (req.publicImageLink)  updateBlockImage.Image =   req.publicImageLink
    // Extract the existing values

    const updatequery = `UPDATE press_coverages SET ? WHERE id=?`;

    const [result] = await pool.query(updatequery, [updateBlockImage, id]);
    return result;
  } catch (error) {
    console.error("Error updating press coverage:", error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while updating press coverage.",
    });
  }
};



const  deletepress = async(req,res)=>{
  const id= req.params.id
  const deleteQuery = `DELETE FROM press_coverages WHERE id=? `
  await pool.query(deleteQuery, [id])
  return res.send({status:'success', message:"press has  deleted"})
}

export const pressCoverService  = {
  addPressCoverage,
  getAllPressCoverage,
  updatepressCoverage,
  deletepress
}