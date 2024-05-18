"use strict";

var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("cors"));
require("dotenv/config");
var _express = _interopRequireDefault(require("express"));
var _helmet = _interopRequireDefault(require("helmet"));
var _httpStatus = _interopRequireDefault(require("http-status"));
var _morgan = _interopRequireDefault(require("morgan"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _router = _interopRequireDefault(require("./SSL/router"));
var _aiSearchRoute = _interopRequireDefault(require("./air/sabre/airSearch/aiSearchRoute"));
var _router2 = _interopRequireDefault(require("./ask question/router"));
var _bkash = _interopRequireDefault(require("./bkash/bkash.route"));
var _route = _interopRequireDefault(require("./blog/route"));
var _bookingRoute = _interopRequireDefault(require("./booking/bookingRoute"));
var _depositeRoute = _interopRequireDefault(require("./deposit/depositeRoute"));
var _allHotelRoute = require("./hotel/hotelRoute/allHotelRoute");
var _autoCompleteRoute = _interopRequireDefault(require("./hotel/hotelRoute/autoCompleteRoute"));
var _hotelSearchRoute = require("./hotel/hotelRoute/hotelSearchRoute");
var _route2 = _interopRequireDefault(require("./packagesearch/route"));
var _route3 = _interopRequireDefault(require("./partner/route"));
var _route4 = _interopRequireDefault(require("./payment/route"));
var _route5 = _interopRequireDefault(require("./popup/route"));
var _route6 = _interopRequireDefault(require("./presscoverage/route"));
var _router3 = _interopRequireDefault(require("./tourpackage/router"));
var _userroute = _interopRequireDefault(require("./user/userroute"));
var _visaRoute = require("./visa/visaRoute");
var _route7 = _interopRequireDefault(require("./wishlist/route"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
var options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description: "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html"
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com"
      }
    },
    servers: [{
      url: "http://localhost:3000"
    }]
  },
  apis: ["./routes/*.js"]
};
app.use((0, _helmet["default"])());
var specs = (0, _swaggerJsdoc["default"])(options);
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
app.use("/api-docs", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(specs));
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());

// routes
app.use("/api/v1/package", _router3["default"]);
app.use("/api/v1/user", _userroute["default"]);
app.use("/api/v1/deposit", _depositeRoute["default"]);
app.use("/api/v1/booking", _bookingRoute["default"]);
app.use("/api/v1/press", _route6["default"]);
app.use("/api/v1/payment", _route4["default"]);
app.use("/api/v1/popup", _route5["default"]);
//Routes
app.use("/api/v1/blog", _route["default"]);
app.use("/api/v1/askquestion", _router2["default"]);
app.use("/api/v1/partner", _route3["default"]);
app.use("/api/v1/bkash", _bkash["default"]);
app.use("/api/v1/ssl", _router["default"]);
app.use("/api/v1/wishlist", _route7["default"]);
app.use("/api/v1/search", _route2["default"]);
app.post("/api/v1/air-search", _aiSearchRoute["default"]);
app.get("/api/v1/hotel/autocomplete/:asking", _autoCompleteRoute["default"]);
app.post("/api/v1/hotel/search", _hotelSearchRoute.hotelSearchRoute);
app.use("/api/v1/hotel/hotel-booking", _allHotelRoute.hotelRoute);
app.use("/api/v1/visa", _visaRoute.visaRoutes);
app.get("/", function (req, res, next) {
  res.send("Welcome to FlyFar Ladies Expressjs v1 ");
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