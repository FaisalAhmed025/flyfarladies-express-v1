import mysql from 'mysql2/promise'

const db = {
    // port: 3306,
    // host: '127.0.0.1',
    // user: 'root',
    // password: '',
    // database: 'flyfar-express',

    user:"root",
    password: "FlyFarTech2$",
    host: "35.229.222.197",
    database:"flyfarLadiesExpress",
    dateStrings: true,
};
export const pool = mysql.createPool(db);
export default pool;