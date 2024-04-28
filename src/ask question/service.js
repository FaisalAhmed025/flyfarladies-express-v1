import pool from "../database/db";

const AskQuestion = async (req, res) => {
  try {
    const { fullName, email, phone, tourType, traveller, date, description } = req.body;
    
    // Execute raw SQL INSERT query to insert question details into database
    const query = `INSERT INTO askQuestion ( fullName, email, phone, tourType, traveller, date, description) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [fullName, email, phone, tourType, traveller, date, description];
    await pool.query(query, values);
    
    return res.status(201).json({
      status: 'success',
      message: 'Thanks for asking question',
    });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ error: "Error adding question" });
  }
};


const allAskQuestion = async(req,res)=>{
  const allquery =`SELECT * FROM askQuestion`
  const [data] = await pool.query(allquery)
  return res.status(201).json({
    status: 'success',
    data:data
  });

}



export const askQuestionService ={
  AskQuestion,
  allAskQuestion
}