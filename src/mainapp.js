import cors from "cors";
import express from "express";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import logger from "morgan";
/*
import packageRouter from './routes/packageroute'
import userRouter from './routes/userRoute'
import depositRoute from './deposit/depositeRoute'
import bookingRouter  from './booking/bookingRoute';
*/

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://www.flyfarladies.com",
      "https://localhost:3000",
      "https://erp.flyfar.org",
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


// routes

/*app.use('/api/v1/user', userRouter)
app.use('/api/v1/package',  packageRouter)
app.use("/api/v1/deposit", depositRoute )
app.use("/api/v1/booking",  bookingRouter )*/

console.log('here')
app.get("/", (req, res, next) => {
  console.log('now')
  res.send("Welcome to Fly Far Trips V1.0");
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
