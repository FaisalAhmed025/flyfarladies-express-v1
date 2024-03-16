import mysql from 'mysql2/promise'
const db = {
    port: 3306,

    // host: '127.0.0.1',
    // user: 'root',
    // password: '',
    // database: 'flyfar-express',

    host: 'flyfarint.com',
    user: 'flyfarin_fflv2',
    password: '123Next2$',
    database: 'flyfarin_fflv2',


};
export const pool = mysql.createPool(db);

export default pool;