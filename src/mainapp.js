import cors from "cors";
import express from "express";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import logger from "morgan";

import tourpackageRoute from './tourpackage/router'
import userRouter from './user/userroute'
import depositRoute from './deposit/depositeRoute'
import bookingRouter  from './booking/bookingRoute';
import presscoverageRoute  from './presscoverage/route'

const app = express();
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
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());


// routes

app.use('/api/v1/package',  tourpackageRoute)
app.use('/api/v1/user', userRouter)
app.use("/api/v1/deposit", depositRoute )
app.use("/api/v1/booking",  bookingRouter )
app.use("/api/v1/press", presscoverageRoute)

app.get("/", (req, res, next) => {
  res.send("Welcome to FlyFar Ladies Express");
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
