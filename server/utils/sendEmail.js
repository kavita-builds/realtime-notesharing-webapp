const nodemailer = require("nodemailer");
 require("dotenv").config();
const sendEmail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
  

auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
}
  });

  await transporter.sendMail({
    from: "Notes App",
    to,
    subject: "Password Reset OTP",
    html: `<h2>Your OTP is: ${otp}</h2>`,
  });
};

module.exports = sendEmail;