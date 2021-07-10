const express = require("express");
const colors = require("colors");
const path = require("path");
const cloudinary = require("cloudinary");
// const dotenv = require("dotenv");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const userRouter = require("./routes/userRouter");
const serviceRouter = require("./routes/serviceRouter");
const orderRouter = require("./routes/orderRouter");
const cartRouter = require("./routes/cartRouter");
const paymentRouter = require("./routes/paymentRouter");
const ConnectDB = require("./config/db");

const ErrorMiddleWare = require("./middleware/errors");

//path for working with the directories

if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "backend/config/config.env" });

// dotenv.config({ path: "./config/config.env" });

ConnectDB(); //connecting to the database

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//middleware for parsing the json to javascript objects //the data is in string {name: "suporl",age: 20} and by parsing the json data  we are converting it to javascript obj.  ..so now const obj = {name: ...,age:...} ,andlater can be used as console.log(obj.name)

//and when sending data to the server like this we have to pass it as string and not object ..use json.stringify() then

//use json body parser for post method  \||/

app.use(express.json({ limit: "50mb" })); //to be able to use res.status.json we nee do declare the app.use(express.json())  //this is a middleware which we need when doing req.body.amount or req.body.text //before to parse it would be bodyparser.json() but now it is available out of the box

//urlencoded({ extended: true }) - middleware for parsing bodies from URL. ..

//acceptts the utf-8 encoding of the body..later a new body  object containing the parsed data is populated on the request obj suppose req.body

app.use(express.urlencoded({ limit: "50mb", extended: true })); //body parser is deprecated and now has been added out of the box

app.use(cookieParser()); //parses cookie header and populates req.cookies //parses the incoming cookies and transform into objectt so we can read and use it

app.use(fileUpload());

app.use(
  //with cors we can pass the cookies and data back and forth!!
  cors({
    origin: "http://localhost:5000", //cors is cross platform to connect with the front end
    credentials: true, //with this we can pass the cookie from the server to the browser
  })
);

//our  routes in here  //or middlewares

app.use("/auth", userRouter);

app.use("/services", serviceRouter);

app.use("/order", orderRouter);

app.use("/cart", cartRouter);

app.use("/payment", paymentRouter);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}

//middleware to handle the errors //this runs when the next is passed above
app.use(ErrorMiddleWare);

//connect to the PORT from the config.env and if there is any type of of error user 5000 as a port

const PORT = process.env.PORT || 5000;

//listen to the port

// const server =
app.listen(
  PORT,
  console.log(
    `RUNNING SERVER IN ${process.env.NODE_ENV || "PRODUCTION"} Mode in PORT ${
      process.env.PORT || 5000
    }`.yellow.bold
  )
);

//Handle the unhandled Promise Rejections  //to be done later

// process.on("unhandledRejection", (err) => {
//   console.log(`error: ${err.message}`);
//   console.log(`shutting down the server due to unHandled promise Rejection`);
//   server.close(() => {
//     process.exit(1);
//   });
// });
