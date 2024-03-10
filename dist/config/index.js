"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config({
  path: _path["default"].join(process.cwd(), ".env")
});
var _default = exports["default"] = {
  env: process.env.NODE_ENV,
  port: 3000
};