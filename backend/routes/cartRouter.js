const express = require("express");
const router = express.Router();
const isAuthenticatedUser = require("../middleware/auth");
const cartController = require("../controller/cartController");

router
  .route("/getMyCartItems")
  .get(isAuthenticatedUser, cartController.getMyCartItems);

router
  .route("/deleteCartItem/:id")
  .delete(isAuthenticatedUser, cartController.deleteMyCartItem);

router.route("/new/:id").post(isAuthenticatedUser, cartController.postInCart);

module.exports = router;
