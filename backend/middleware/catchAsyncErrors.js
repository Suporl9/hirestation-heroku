//the anonymous function with func parameter holds our async handler funcion from controller and wraps it in a promise which either resolves or rejects (throws catch and move to errormiddleware)
module.exports =
  (func) =>
  (
    req,
    res,
    next //double arrow //curried function
  ) =>
    Promise.resolve(func(req, res, next)).catch(next);

//lets break it down

//we have a function that wraps it in a promise
//in our case the function it will take a express router
//since we are passing the handler ino promise.resolve it will resolve with whaever our routehandler returns
//however if  one of the statements in our handler gives us a rejected promise
//it will go to the catch and be passed to next which will run the error Middleware and gives us the  expected error

//visit this site if confused(https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016)
//tto undderstand muliple arrow function visit(https://stackoverflow.com/questions/32782922/what-do-multiple-arrow-functions-mean-in-javascript)

// function (func){
//     return function(req,res,next){
//         return Promise.resolve(func(req,res,next)).catch(next)
//
//         }
//   }
//
