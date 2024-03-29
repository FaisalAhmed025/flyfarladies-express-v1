"use strict";

var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _httpStatus = _interopRequireDefault(require("http-status"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _morgan = _interopRequireDefault(require("morgan"));
var _router = _interopRequireDefault(require("./tourpackage/router"));
var _userroute = _interopRequireDefault(require("./user/userroute"));
var _depositeRoute = _interopRequireDefault(require("./deposit/depositeRoute"));
var _bookingRoute = _interopRequireDefault(require("./booking/bookingRoute"));
var _route = _interopRequireDefault(require("./presscoverage/route"));
var _route2 = _interopRequireDefault(require("./payment/route"));
var _route3 = _interopRequireDefault(require("./wishlist/route"));
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

app.use('/api/v1/package', _router["default"]);
app.use('/api/v1/user', _userroute["default"]);
app.use("/api/v1/deposit", _depositeRoute["default"]);
app.use("/api/v1/booking", _bookingRoute["default"]);
app.use("/api/v1/press", _route["default"]);
app.use("/api/v1/payment", _route2["default"]);
app.use("/api/v1/wishlist", _route3["default"]);
app.get("/", function (req, res, next) {
  res.send("Welcome to FlyFar Ladies Express");
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