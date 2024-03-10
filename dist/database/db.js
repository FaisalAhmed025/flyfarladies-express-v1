"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _promise = _interopRequireDefault(require("mysql2/promise"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/*
import mysql from 'mysql2/promise'

const db = {
    port: 3306,
    // host: '127.0.0.1',
    // user: 'root',
    // password: '',
    // database: 'flyfarexpress',


    host: 'flyfarint.com',
    user: 'flyfarin_fflv2',
    password: '123Next2$',
    database: 'flyfarin_fflv2',


};


export const pool = mysql.createPool(db);

const testDatabaseConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connected successfully');
        connection.release();
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
};


testDatabaseConnection()

export default {
     testDatabaseConnection
}*/

//import 'dotenv/config'

var connection = {
  host: 'flyfarint.com',
  user: 'flyfarin_fflv2',
  password: '123Next2$',
  database: 'flyfarin_fflv2',
  dateStrings: true
};

// const connection = {
//     user: 'root',
//     host: 'localhost',
//     password: '',
//     database: 'qt_b2c'
// };

console.log(connection);
var pool = _promise["default"].createPool(connection);

//console.log(pool)
var _default = exports["default"] = pool;