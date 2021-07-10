const express = require("express");
const router = express.Router();
const isAuthenticatedUser = require("../middleware/auth");
const paymentController = require("../controller/paymentController");

router
  .route("/process")
  .post(isAuthenticatedUser, paymentController.processPayment);
router
  .route("/stripeApiKey")
  .get(isAuthenticatedUser, paymentController.getStripeApiKey);

module.exports = router;
