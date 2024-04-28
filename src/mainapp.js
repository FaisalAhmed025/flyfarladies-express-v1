import cors from "cors";
import express from "express";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import logger from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import tourpackageRoute from "./tourpackage/router";
import userRouter from "./user/userroute";
import depositRoute from "./deposit/depositeRoute";
import bookingRouter from "./booking/bookingRoute";
import presscoverageRoute from "./presscoverage/route";
import paymentRoute from "./payment/route";
import bkashRoute from  "./bkash/bkash.route"
import sslpaymentRoute from './SSL/router'
import wishlistRoute from "./wishlist/route";
import blogRoute from './blog/route'
import packagesearchRoute  from './packagesearch/route'
import { onWayPostRoute } from "./air/sabre/sabreRoutes/oneWayRoute";
import { roundWayPostRoute } from "./air/sabre/sabreRoutes/roundWayRoute";
import { multiCitySearch } from "./air/sabre/sabreRoutes/multiCityRoute";
import { flightBookingRoute } from "./air/sabre/airBooking/flightBookingRoute";
import rateHawkAutoCompleteResult from "./hotel/hotelRoute/autoCompleteRoute";
import { hotelSearchRoute } from "./hotel/hotelRoute/hotelSearchRoute";
import "dotenv/config";
import { hotelRoute } from "./hotel/hotelRoute/allHotelRoute";
import { visaRoutes } from "./visa/visaRoute";
import askquestionRoute from  './ask question/router'
const app = express();

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://test.flyfartrips.com",
      "https://localhost:3000",
      "https://erp.flyfar.org/",
    ], // Replace with your React app's URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    responseHeader: [
      "Content-Type",
      "access-control-allow-origin",
      "access-control-allow-header",
    ],
    credentials: true, // Include cookies and other credentials
  })
);
//parser
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes

app.use("/api/v1/package", tourpackageRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/deposit", depositRoute);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/press", presscoverageRoute);
app.use("/api/v1/payment", paymentRoute);

app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/askquestion", askquestionRoute);

app.use("/api/v1/bkash", bkashRoute);
app.use("/api/v1/ssl", sslpaymentRoute);
app.use("/api/v1/wishlist", wishlistRoute);
app.use("/api/v1/search", packagesearchRoute);

app.post("/api/v1/air-search/oneway", onWayPostRoute);
app.post("/api/v1/air-search/roundWay", roundWayPostRoute);
app.post("/api/v1/air-search/multiCity", multiCitySearch);
app.use("/api/v1/air/booking", flightBookingRoute);
app.get("/api/v1/hotel/autocomplete/:asking", rateHawkAutoCompleteResult);
app.post("/api/v1/hotel/search", hotelSearchRoute);
app.use("/api/v1/hotel/hotel-booking", hotelRoute);
app.use("/api/v1/visa", visaRoutes);
app.get("/", (req, res, next) => {
  res.send("Welcome to FlyFar Ladies Expressjs v1 ");
});

//handle not found
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

module.exports = app;
