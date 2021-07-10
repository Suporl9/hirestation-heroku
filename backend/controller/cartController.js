const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { populate } = require("../model/cartModel");
const cartModel = require("../model/cartModel");
const serviceModel = require("../model/serviceModel");
const userModel = require("../model/usermodel");
const ErrorHandler = require("../utils/errorHandler");

//post in cart collection(user and service) => post=>  cart/new/:id

//to do => cant add service if the model has already the service id
const postInCart = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user._id; //contains user object from database

  const id = req.params.id;

  const cart = new cartModel(req.body);

  const user = await userModel.findById(req.body.user);

  const service = await serviceModel.findById(id);

  if (!service) {
    return next(new ErrorHandler("Service Not Found!!", 404));
  }

  cart.user = user;

  cart.service = service;

  await cart.save();

  return res.status(200).json({
    sucess: true,
    cart,
  });
});

//get user cartItems => get => cart/getMyCartItems

const getMyCartItems = catchAsyncErrors(async (req, res, next) => {
  const myCartItems = await cartModel.find({ user: req.user._id }).populate({
    path: "service",
    populate: [
      {
        path: "user",
        model: "user",
        // populate: [
        //   {
        //     path: "services",
        //     model: "service",
        //   },
        // ],
      },
    ],
  });
  // .exec(function (err, docs) {});
  // .populate("user");

  res.status(200).json({
    success: true,
    cartItemsCount: myCartItems.length,
    myCartItems,
  });
});

//delete the item according to the id => delete=> cart/deleteCartItem/:id

const deleteMyCartItem = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const deleteItem = await cartModel.findById(id);

  if (!deleteItem) {
    return next(new ErrorHandler("Item not found", 404));
  }

  await deleteItem.remove();

  res.status(200).json({
    success: true,
    message: "sucessfully deleted Id",
  });
});

module.exports = {
  postInCart,
  getMyCartItems,
  deleteMyCartItem,
};

// const user = await userModel.findById(req.body.user);
// if (user.carts === id) {
//   return next(new ErrorHandler("Service Already in Cart!!", 400));
// }

// user.carts.push(cart);
// await user.save();
