const express = require("express");
const router = express.Router();
const serviceController = require("../controller/serviceController");
const isAuthenticatedUser = require("../middleware/auth");

//auth is a custom middleware to verifying the token and creating customer if only there is the token or user is logged in already

router.route("/new").post(isAuthenticatedUser, serviceController.postService); //if the user is logged in or has the token still available then only he will be able to create a new customer or else it would be unauthorized

//get all the services in the database
router.route("/").get(serviceController.getAllServices); //isauthenticated has _id so it knows which user //in req.user

//get user posted services

router.route("/me").get(isAuthenticatedUser, serviceController.getUserServices);

//for creating a review for the service

router
  .route("/review")
  .put(isAuthenticatedUser, serviceController.createServiceReview);

//get service reviews according to the query passed in the link // services/review?id=""

router
  .route("/reviews")
  .get(isAuthenticatedUser, serviceController.getServiceReviews);

//delete  service review by  user witth query service id  and review id

router
  .route("/review")
  .delete(isAuthenticatedUser, serviceController.deleteServiceReview);

//get  a single service according to the id passed from the database

router.route("/:id").get(serviceController.getAService);

//update the service //for eg the title and other body can be updated

router.route("/:id").put(isAuthenticatedUser, serviceController.updateService);

//for deleting  the service //according the objectid  ofcourse

router
  .route("/:id")
  .delete(isAuthenticatedUser, serviceController.deleteService);

module.exports = router;
