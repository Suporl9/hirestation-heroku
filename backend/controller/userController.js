const UserModel = require("../model/usermodel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const sendEmail = require("../utils/sendEmail");

// register new user //post => localhost/auth/new

const postRegisterController = catchAsyncErrors(async (req, res, next) => {
  //setting cloudinry//which folder to upload to
  // console.log(req.body.avatar);

  req.body.avatar = cloudinary.url(
    "https://res.cloudinary.com/hire-station/image/upload/v1625564982/avatars/default_brykje.png"
  );
  const avatar = req.body.avatar;
  // console.log(avatar);
  const result = await cloudinary.v2.uploader.upload_large(avatar, {
    //upload less than 700 kb for now
    folder: "avatars",
    // width: 150,
    // crop: "scale",
  });
  // console.log("avatar", result);
  // // console.log(result);
  //destructing the req.body that we ll be sending to the database with the post request
  const { fullname, email, password, passwordverify } = req.body;
  //  validation
  //if the user does not enter all the fields we are sending the errmessage instead of just registering it
  if (!fullname || !email || !password || !passwordverify || !avatar)
    return next(new ErrorHandler("Please fill all fields", 400));
  // if the user enter password less than 6 we send the errormessage to the frontend
  if (password.length < 6)
    return next(
      new ErrorHandler("Password mustt be more than 6 characters!", 400)
    );
  //   if the password doesnot match with the paswordverify we send the error
  if (password !== passwordverify)
    return next(new ErrorHandler("Password do not match!!", 400));
  //For checking if the email entered by the user already exists in the database and if it exists then error message
  const existingUser = await UserModel.findOne({ email: email });
  if (existingUser)
    return next(
      new ErrorHandler("Account with this email already exists!!", 400)
    );
  //hashing the password using bcrypt //before saving it to the database
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  //saving the email and hashedpassword in the database!!
  const newUser = new UserModel({
    fullname,
    email,
    passwordHash,
    avatar: {
      public_id: result.public_id, //public_id is identifier that is used for  accessing the uploaded asset
      url: result.secure_url, //secure_url contains https so  using this instead of just the url
    },
  });
  if (!newUser) {
    return next(new ErrorHandler("not created", 404));
  }
  const savedUser = await newUser.save();
  //now log the user with JWT //this will only give token so that the user is logged in with a token
  const token = jwt.sign(
    //payload //data we want to store in token
    {
      user: savedUser._id,
    },
    process.env.JWT_SECRET
    //later add jwtexpirestime to expire after certain time//fot example 7 days,8 days or 1 hour
  );
  // console.log(token);
  //send the token to  the http only cookie.Doing that browser can send the cookie to the server and the server can validate the data
  res
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date( //cookie expireswithin 7 days
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
    })
    .json({
      success: true,
      user: savedUser,
      token,
    });
});

// login post api with jwt bcrypt and http cookie!! post => localhost/auth/login

const postLogInController = catchAsyncErrors(async (req, res, next) => {
  try {
    //destructuring the values that we'll be sending to the server in login page

    const { email, password } = req.body;

    //Validation

    //if the email and passwords are correct

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please fill all the fields." });

    //checking the sent email in the database from the server

    const existingUser = await UserModel.findOne({ email });

    //if not the correct email in database:

    if (!existingUser)
      return next(new ErrorHandler("Invalid Email or Password", 401));

    //checking if the password(hashed) is correct with bcrypt.compare

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    //if the password is not correct

    if (!passwordCorrect)
      return next(new ErrorHandler("Invalid Email or Password", 401));

    //now making a token with jwt for the user

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    //sending that token to cookie

    res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date( //expires after 7 days
          Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
      })
      .json({
        success: true,
        user: existingUser,
        token,
      });
  } catch (error) {
    console.log(error);
  }
});

//logout registered user //get => localhost/auth/logout

const getLogOutController = async (req, res) => {
  //removing the cookie on logging out

  res.cookie("token", "", {
    //he cookie will be set to an empty string instead of the the previous cookie

    httpOnly: true,
    expires: new Date(0),

    //international standard time apparanttly  //this clears the  cookie from the browser..so now the tokenis also removed
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

//to checkif the user is logged  in or not sends true is yes and false if not

//if the user is logged in//verify token from cookies and validate with JWT //GET => localhost/auth/loggedin

const getLoggedin = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);
    //as the token is httponlys so we cant send the actual token insted send true if there is token and false if there is no any token !!
    res.send(true); //passing true as token is validated  //<= send  data to the client
  } catch (error) {
    res.json(false);
  }
};

//sends url to mail when  user forgets password // POST => auth/password/forget
const forgotPassword = async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });

  // const { resetPasswordToken, resetPa sswordExpire } = req.body;

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 404));
  }

  const resetToken = user.getResetPasswordToken();
  //if exists get reset token

  await user.save({ validateBeforeSave: false }); //disables automtic validation before save    //works when validated too

  //create reset password url

  // const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset url is as follows:\n\n${resetUrl}.\n\nIf you didn't request .simply ignore it!`;
  //lets send it to a mail
  try {
    await sendEmail({
      email: user.email,
      subject: "Hire Station Password Recovery!",
      message,
    });

    res.status(200).json({
      success: true,
      message: `email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
};

//for resetting the password when form is filled with password and new password //POST => auth/password/reset/:token

const ResetPassword = async (req, res, next) => {
  //comparing the token we have wih the hashed token in the database

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("Token not found or expired"));
  }

  // if (req.body.password !== req.body.confirmPassword) {
  //   return next(new ErrorHandler("Password do not match!"));
  // }

  const password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  //hashing the password using bcrypt //before saving it to the database

  const salt = await bcrypt.genSalt();

  const passwordHashed = await bcrypt.hash(password, salt);

  user.passwordHash = passwordHashed;

  await user.save();

  const token = jwt.sign(
    {
      user: user._id,
    },
    process.env.JWT_SECRET
  );

  //sending that token to cookie

  res
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date( //expires after 7 days
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
    })
    .json({
      success: true,
      user: user,
      token,
    });
};

//get the current info // GET => auth/me

const getUserProfile = async (req, res) => {
  const user = await UserModel.findOne(req.user._id).populate("services");
  // .populate("carts");

  res.status(200).json({
    success: true,
    user,
  });
};

//update user password for logged in user  // PUT => auth/password/update

const updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword, verifyNewPassword } = req.body;
  const user = await UserModel.findOne(req.user._id);

  if (newPassword !== verifyNewPassword) {
    return next(new ErrorHandler("Passwords do not match!!"));
  }
  //check if the old password is correct

  const comparePassword = await bcrypt.compare(oldPassword, user.passwordHash);

  if (!comparePassword) {
    return next(new ErrorHandler("Old password incorrect!", 400));
  }

  //hash the password with bcrypt and save

  const salt = await bcrypt.genSalt();
  const passwordHashed = await bcrypt.hash(newPassword, salt);

  user.passwordHash = passwordHashed;

  await user.save();

  //now send the jwt token since the password is updated in the database

  const token = jwt.sign(
    {
      user: user._id,
    },
    process.env.JWT_SECRET
  );

  //sending that token to cookie

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date( //expires after 7 days
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
    })
    .json({
      success: true,
      // user: user,
      token,
    });
};

//update user profile //name and email // PUT => me/update

const profileUpdate = async (req, res) => {
  // console.log(req.body.bio);
  const updateProfileFields = {
    fullname: req.body.fullname,
    email: req.body.email,
  };
  if (req.body.avatar !== "") {
    const user = await UserModel.findById(req.user._id);

    const image_id = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(image_id);

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      //upload less than 700 kb for now

      folder: "avatars",
      // width: 150,
      // crop: "scale",
    });
    updateProfileFields.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  if (req.body.bio !== "") {
    updateProfileFields.bio = req.body.bio;
  }
  if (req.body.from !== "") {
    updateProfileFields.from = req.body.from;
  }
  const newProfile = await UserModel.findByIdAndUpdate(
    req.user._id,
    updateProfileFields,
    {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    // newProfile,
  });
};

// const profileUpdateAvatar = async (req, res) => {
//   const avatar = req.body.data;
//   console.log(avatar);

// const user = await UserModel.findById(req.user._id);
// const image_id = user.avatar.public_id;
// const destroyed = await cloudinary.v2.uploader.destroy(image_id);

// const result = await cloudinary.v2.uploader.upload(avatar, {
//   folder: "avatars",
// });

// avatar = {
//   public_id: result.public_id,
//   url: result.secure_url,
// };

// const avataruser = await UserModel.findByIdAndUpdate(req.user._id, avatar, {
//   new: true,
//   runValidators: true,
//   useFindAndModify: false,
// });
// res.status(200).json({ success: true });
// };

//get all the users hiring the service by the service seller user //get => auth/users

const getAllUsers = async (req, res) => {
  const users = await UserModel.find();

  res.status(200).json({
    success: true,
    users,
  });
};

//get an individual user according to the params id

const getSingleUser = async (req, res, next) => {
  const user = await UserModel.findById(req.params.id).populate("services");
  if (!user) {
    return next(new ErrorHandler("user not found!!", 404)); //if anything is passed as argument  in the next method express treats it as error   //pass return so that  next  line wont run and the  server will crash
  }
  res.status(200).json({
    success: true,
    user,
  });
};

//delete user // DELETE => auth/me/closeSubmit/:id

const deleteUserProfile = async (req, res) => {
  await UserModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
  });
};

module.exports = {
  postRegisterController,
  postLogInController,
  getLogOutController,
  getLoggedin,
  forgotPassword,
  ResetPassword,
  getUserProfile,
  updatePassword,
  deleteUserProfile,
  profileUpdate,
  // profileUpdateAvatar,
  getAllUsers,
  getSingleUser,
};
