import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import httpStatus from "http-status";
import logger from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import sslpaymentRoute from "./SSL/router";
import searchResult from "./air/sabre/airSearch/aiSearchRoute";
import askquestionRoute from "./ask question/router";
import bkashRoute from "./bkash/bkash.route";
import blogRoute from "./blog/route";
import bookingRouter from "./booking/bookingRoute";
import depositRoute from "./deposit/depositeRoute";
import { hotelRoute } from "./hotel/hotelRoute/allHotelRoute";
import rateHawkAutoCompleteResult from "./hotel/hotelRoute/autoCompleteRoute";
import { hotelSearchRoute } from "./hotel/hotelRoute/hotelSearchRoute";
import packagesearchRoute from "./packagesearch/route";
import partnerRoute from "./partner/route";
import paymentRoute from "./payment/route";
import popUpRoute from "./popup/route";
import presscoverageRoute from "./presscoverage/route";
import tourpackageRoute from "./tourpackage/router";
import userRouter from "./user/userroute";
import reportRoute from "./report/router";
import { visaRoutes } from "./visa/visaRoute";
import wishlistRoute from "./wishlist/route";

import captureDeviceInfo from "./helper/capturedeviceinfo";
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


app.use(helmet());
const specs = swaggerJSDoc(options);
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(captureDeviceInfo);
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
app.use("/api/v1/popup", popUpRoute);
//Routes
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/askquestion", askquestionRoute);
app.use("/api/v1/partner", partnerRoute);
app.use("/api/v1/report", reportRoute);

app.use("/api/v1/bkash", bkashRoute);
app.use("/api/v1/ssl", sslpaymentRoute);
app.use("/api/v1/wishlist", wishlistRoute);
app.use("/api/v1/search", packagesearchRoute);
app.post("/api/v1/air-search", searchResult);
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
