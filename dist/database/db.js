"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pool = exports["default"] = void 0;
var _promise = _interopRequireDefault(require("mysql2/promise"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var db = {
  // port: 3306,
  // host: '127.0.0.1',
  // user: 'root',
  // password: '',
  // database: 'flyfar-express',

  user: "root",
  password: "FlyFarTech2$",
  host: "35.229.222.197",
  database: "flyfarLadiesExpress",
  dateStrings: true
};
var pool = exports.pool = _promise["default"].createPool(db);
var _default = exports["default"] = pool;