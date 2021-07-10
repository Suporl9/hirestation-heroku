const nodeMailer = require("nodemailer");
// const { options } = require("../routes/userRouter");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.SMTP_FROM_NAME}<${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(message);
};

module.exports = sendEmail;
