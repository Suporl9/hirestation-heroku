const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  //if tthere are four arguments in middlewate express  knows its an error handling middleware
  err.statusCode = err.statusCode || 500; //we could havejust passed err.statuscode since we already have statuscode and message but we are passing || (or) so we are doing  like this
  err.message = err.message || "Internal Server Error";

  //if we are in development mode use this code showing all the generic errors like message statuscode and the stack trace
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    console.log(err.message, err.stack);
    res.status(err.statusCode).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack, //we can use thiis statae because we are exetending the errorHandler from error   //the message and  status are comming from errorhandler which are passedin this middleware
    });
  }

  //if we are in the production mode then use this code //this  is  for the user or the client
  if (process.env.NODE_ENV === "PRODUCTION") {
    //monggose id error handling
    if (err.name === "CastError") {
      //err.name is casterror in the err.stack
      const message = `Resource not found : ${err.path}`;
      err = new ErrorHandler(message, 404);
    }
    //schema validation error handling//please enter title //please enter description
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      err = new ErrorHandler(message, 400);
    }

    if (err.name === "JsonWebTokenError") {
      //if there is invalid code the show this message
      const message = "JSON web Token is Invalid.Try Again!";
      err = new ErrorHandler(message, 400);
    }

    if (err.name === "TokenExpireError") {
      const message = "JSON web token is expired.Try Again";
      err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  //   console.log(err);
};
