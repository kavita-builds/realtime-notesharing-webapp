const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// ================= FORGET PASSWORD (OTP) =================
exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000; // 5 minutes

    await user.save();

    // send email
    await sendEmail(email, otp);

    res.json({ message: "OTP sent to email" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= VERIFY OTP =================
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({
      email,
      otp,
      otpExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.json({ message: "OTP verified" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= RESET PASSWORD =================
exports.resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpire = undefined;

    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= REGISTER =================
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ================= LOGIN =================
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      "secretkey",
      { expiresIn: "1d" }
    );

   res.status(200).json({
  message: "Login successful",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};