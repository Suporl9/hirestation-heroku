const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please enter your fullname!"],
  },

  email: {
    type: String,
    required: [true, "Please enter your email!"],
    unique: true,
    validate: [validator.isEmail, "please enter valid email-address"],
  },
  passwordHash: {
    type: String,
    required: [true, "Please enter your password"],
    //fix error later on
    // select: false, //when sending the data of the user in the frontend password is not selected(send)
  },
  avatar: {
    //since we are adding cloudinary for our pictures and product images we will be storing the URL so type string
    //get the two values from cloudinary //the _id and url
    public_id: {
      required: true,
      type: String,
    },
    url: {
      required: true,
      type: String,
    },
  },

  role: {
    type: String,
    default: "admin",
  },
  bio: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "service",
    },
  ],
  from: {
    type: String,
  },

  // carts: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "cart",
  //   },
  // ],

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//Instance Methods

//assign a funciton to the "methods" object of our UserSchema  //we need to create this instance cause we need to get and store later on of ou  schema

UserSchema.methods.getResetPasswordToken = function () {
  //Generating a reset token with crypto
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hash the resetToken and set it to resetPasswordToken //this will be savedin the database and will he used later to compare will the plain token to validate the user

  this.resetPasswordToken = crypto //using thsi kwyword indicate resetPasswordToken is of usermodel which we will save later on and not now
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //also set the token expiry date
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("user", UserSchema);
