
import mysql from 'mysql2/promise';
const connection = {
    host: 'flyfarint.com',
    user: 'flyfarin_fflv2',
    password: '123Next2$',
    database: 'flyfarin_fflv2',
    dateStrings : true
};
const pool = mysql.createPool(connection);



export default pool;