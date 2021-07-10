const mongoose = require("mongoose");

const connectDB = async (req, res) => {
  try {
    const conn = await mongoose.connect(process.env.DBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
