//creating a class that handles an error and later pass as a middleware

class ErrorHandler extends Error {
  //Error is the nativr error object and by extending it  we are creating our  own error object which displays "fancyerror"
  constructor(message, statusCode) {
    //using constructor  we are able to initialze object of our class which is called as ErrorHandler
    super(message); //taking the message from parent obj  Error(native) error.message //and this represents the component class constructor//refers to the parent class and to access the parents  properties and methods!
    this.statusCode = statusCode; //we will get the statuscode from the middleware errors
    this.message = message;
    // Error.captureStackTrace(this, this.constructor); //creates .stack property on the target object which helps to trace which functions were called when and leading back to the original global scope call
  } //this  first argument is  the sate itself and the second  one is to hide the implementation deatails of the error generation from the user
}
module.exports = ErrorHandler;
