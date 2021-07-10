const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please enter service title!"],
    maxLength: [100, "Service title cannot exceed 100 characters!"],
  },
  price: {
    type: Number,
    required: [true, "Please enter your service price!"],
    maxLength: [5, "service price cannot exceed 5 characters!"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "please enter description!"],
  },
  ratings: {
    //for average rating of this service //for eg: 4  out of five
    type: Number,
    default: 0.0,
  },
  images: [
    {
      //using this with cloudinary //store two thing image id and image url
      //get  these two values from cloudinary
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "please select category for this service!"],
    enum: {
      //enum is known as fix number of possible values//we can have only these values as the categories
      //user have to select only from these categories
      values: [
        "Graphics-And-Design",
        "Game-Development",
        "Web-Programming",
        "Mobile-Apps",
      ],
      message: "Please select correct category for the service",
    },
  },
  seller: {
    //info of the seller that is selling the service
    type: String,
    required: [true, "Please enter service seller!"],
  },
  sellerBio: {
    type: String,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      //later  we will add the reviewer profile
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      //name of the reviewer

      name: {
        type: String,
        required: true,
      },

      rating: {
        type: Number,
        required: true,
      },

      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("service", serviceSchema);
