// this code iis to check if the user is loged in and if logged in give permission to authorise
//this is automated middleware if we want to create anything after the user is logged in

const UserModel = require("../model/usermodel");

const jwt = require("jsonwebtoken");

const isAuthenticatedUser = async (req, res, next) => {
  try {
    const token = req.cookies.token; // getting the incoming cookies which has the token of user and saving to the token constant

    //if there is no any token i.e no any user is currently logged in then  respond with unauthorised

    if (!token)
      return res.status(401).json({
        errorMessage: "unAuthorised!!",
      });

    const verified = jwt.verify(token, process.env.JWT_SECRET); //now checking the token we have with the the secret password so that the token is secured and storing it to verified constant

    // console.log(verified); //gonna give  us{user: "_id(database id)",iat: "//jwt issued date"}

    //creating user property  of obj req and setting the

    req.user = await UserModel.findById(verified.user); //took it from the palyload //see jwt.sign in userController //we have _id in verify.user //so this is for later  user. in usercontroller in jwt.sign() we passed id is user so now we have the the id which is specific to each user and we are storing that id in req object as req.user so if we want to use it later on we ll use it as req.user

    // console.log(req.user); //contains user info {role:,fullname:,email:,passwordHash,_id}

    //req.user property contains the user data now which will be used later on

    //glabbs uses id so if any any problem occur come back again

    next(); //completing this code and jumping to the next function code
  } catch (error) {
    res.status(401).json({
      errorMessage: "unauthorised!!",
    });
  }
};
module.exports = isAuthenticatedUser;
