const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const isAuthenticatedUser = require("../middleware/auth");

//registering route

router.route("/new").post(userController.postRegisterController);

//loggin in route

router.route("/login").post(userController.postLogInController);

//password forgotten

router.route("/password/forgot").post(userController.forgotPassword);

//password reset

router.route("/password/reset/:token").post(userController.ResetPassword);

//logging out route

router.route("/logout").get(userController.getLogOutController);

//logged in route

router.route("/loggedin").get(userController.getLoggedin);

//get user profile route

router.route("/me").get(isAuthenticatedUser, userController.getUserProfile);

//update the password if the user is already logged in  //different from frogot password

router
  .route("/password/update")
  .put(isAuthenticatedUser, userController.updatePassword);

//update the profile for the logged in user(name and email)

router
  .route("/me/update")
  .put(isAuthenticatedUser, userController.profileUpdate);

// router
//   .route("/avatarUpdate")
//   .put(isAuthenticatedUser, userController.profileUpdateAvatar);

//delete own profile  //testing for now

router
  .route("/me/closeSubmit/:id")
  .delete(isAuthenticatedUser, userController.deleteUserProfile);

//get all the users hiring the service by the service seller user //to be fixed later on

router.route("/users").get(isAuthenticatedUser, userController.getAllUsers);

//get a single user with params id

router
  .route("/user/:id")
  .get(isAuthenticatedUser, userController.getSingleUser);

module.exports = router;
