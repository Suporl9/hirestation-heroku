const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  user: {
    //user that has placed the order
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  // service user want to hire
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "service",
    required: true,
  },

  orderInfo: {
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  paymentInfo: {
    // we will use stripe
    id: {
      type: String,
    },

    status: {
      type: String,
    },
  },

  paidAt: {
    type: Date,
  },
  deliveredAt: {
    type: Date,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  adminUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", ordersSchema);
