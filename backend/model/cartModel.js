// const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "service",
    required: true,
    // user:{
    //   type:mongoos.Schema.Types.ObjectId,
    //   ref:"service"
    // }
  },
});

module.exports = mongoose.model("cart", cartSchema);
