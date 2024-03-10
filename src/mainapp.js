import cors from "cors";
import express from "express";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";

import logger from "morgan";
import packageRouter from './routes/packageroute'
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

// routes


app.use('/api/v1/package',  packageRouter)


app.get("/",(req, res) => {

    res.send("Welcome to *****");
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


  app.listen(3000, () => {
    console.log(`Application listening on port 3000`);
  });



module.exports = app;
