const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const dotenv = require("dotenv");
// if (process.env.NODE_ENV !== "PRODUCTION")
//   require("dotenv").config({ path: "backend/config/config.env" });

const stripe = require("stripe")(
  "sk_test_51J1YOYSCxWLgibrfkE8WU5MFDax9Qv5aEgu3KeJP1bBUz7CRXDZBrTY80m8yqa8lZNcghjlVbwRL16u5Z6Na9sws00c73fdIU0"
);

const processPayment = catchAsyncErrors(async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      integration_check: "accept_a_payment",
    },
  });
  // console.log(paymentIntent.client_secret);
  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

const getStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  //  const  api_key = "pk_test_51J1YOYSCxWLgibrfXnUi24LohSZwjaTjoE0Fnlg6OotpxoRtL9lGcNXingXYb8pQv5QmIhSQPgf4e2XfRxOpQAvu00CI0FFLop"
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});

module.exports = {
  processPayment,
  getStripeApiKey,
};
