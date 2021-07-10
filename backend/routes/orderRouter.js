const express = require("express");
const router = express.Router();

const isAuthenticatedUser = require("../middleware/auth");
const orderController = require("../controller/orderController");

//creating and saving order

router.route("/new").post(isAuthenticatedUser, orderController.postOrder);

//get my orders (logged in user orders)

router.route("/me").get(isAuthenticatedUser, orderController.myOrders);

//get my admin dasboard orders

router
  .route("/myOrders")
  .get(isAuthenticatedUser, orderController.userAdminOrders);

//update service from processing to delivered

//delete service by the admin user

router
  .route("/myOrders/:id")
  .put(isAuthenticatedUser, orderController.userUpdateOrder)
  .delete(isAuthenticatedUser, orderController.userDeleteOrder);

//get single order according to id

router.route("/:id").get(isAuthenticatedUser, orderController.getSingleOrder);

//get loggedin user order

module.exports = router;
