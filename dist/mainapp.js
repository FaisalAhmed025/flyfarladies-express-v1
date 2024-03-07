"use strict";

var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _httpStatus = _interopRequireDefault(require("http-status"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _morgan = _interopRequireDefault(require("morgan"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use((0, _cookieParser["default"])());
app.use((0, _cors["default"])({
  origin: ["https://test.flyfartrips.com", "https://localhost:3000", "https://erp.flyfar.org/"],
  // Replace with your React app's URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  responseHeader: ["Content-Type", "access-control-allow-origin", "access-control-allow-header"],
  credentials: true // Include cookies and other credentials
}));
//parser
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
// routes

app.get("/", function (req, res, next) {
  res.send("Welcome to Fly Far Trips V1.0");
});

//handle not found
app.use(function (req, res, next) {
  res.status(_httpStatus["default"].NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [{
      path: req.originalUrl,
      message: "API Not Found"
    }]
  });
  next();
});
module.exports = app;