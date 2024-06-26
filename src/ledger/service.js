
import moment  from "moment";
import pool from "../database/db";


const getledgerForLastNDays = async (days, res) => {
  try {
    // Get the current date
    const currentDate = new Date();
    // Calculate the date 'days' ago
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - days);
    // Format dates using moment.js to match the required format
    const currentDateFormatted = moment(currentDate).format('dddd, MMMM D, YYYY [at] h:mm:ss A');
    const pastDateFormatted = moment(pastDate).format('dddd, MMMM D, YYYY [at] h:mm:ss A');

    // SQL query to match the formatted date range
    const query = `
      SELECT * 
      FROM ledger
      WHERE STR_TO_DATE(createdAt, '%W, %M %e, %Y at %r') BETWEEN STR_TO_DATE(?, '%W, %M %e, %Y at %r') AND STR_TO_DATE(?, '%W, %M %e, %Y at %r')
    `;

    // Execute the query
    const [users] = await pool.query(query, [pastDateFormatted, currentDateFormatted]);
    return res.json(users);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
};

//get last one day user

const getLedgerLast1Day = async (req, res) => {
await  getledgerForLastNDays(1,res)
}

const getLedgerLast7Days = async (req, res) => {
  await getledgerForLastNDays(7,res)
}

const getLedgerLast30Days = async (req,res) => {
  await getledgerForLastNDays(30,res)
}

const getledgerdetails = async (req,res) => {
  const { user_id, transactionid, referenceid} = req.query;

  if (!user_id && !transactionid && !referenceid) {
    return res.status(400).json({ error: 'Please provide either user_id or transactionid' });
  }

  try {
    let query = '';
    let params = [];

    if (user_id) {
      query = `SELECT * FROM ledger WHERE user_id = ?`;
      params = [user_id];
    } else if (transactionid) {
      query = `SELECT * FROM ledger WHERE transactionid = ?`;
      params = [transactionid];
    }else if (referenceid) {
      query = `SELECT * FROM ledger WHERE referenceid = ?`;
      params = [referenceid];
    }

    const [rows] = await pool.query(query, params);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No transactions found' });
    }

    res.json({ transactions: rows });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
}

export const ledgerService  ={
  getLedgerLast1Day,
  getLedgerLast7Days,
  getLedgerLast30Days,
  getledgerdetails
}
