import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Controller
export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation (uncomment if needed)
    if (!name) return next(handleError(400, "Name is required"));
    if (!email) return next(handleError(400, "Email is required"));
    if (!password || password.length < 6) {
      return next(
        handleError(
          400,
          "Password is required and must be at least 6 characters"
        )
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(handleError(400, "Email is already taken"));

    // ✅ Correct password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    next(handleError(500, "Server Error in auth Controller"));
  }
};
// Login Controller
export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Basic validation (uncomment if needed)
    if (!email) return next(handleError(400, "Email is required"));
    if (!password) return next(handleError(400, "Password is required"));
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return next(handleError(400, "Invalid email or password"));
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(handleError(400, "Invalid email or password"));

    //Jwt Token generation can be added here
    const token = jwt.sign(
      { name: user.name, email: user.email, _id: user._id, avatar: user.avatar },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    // Successful login
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(handleError(500, "Server Error in auth Controller"));
  }
};
// GoogleLogin Controller
export const GoogleLogin = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;
    // Check if user exists
    let user;
    user = await User.findOne({ email });
    if (!user) {
      // If user doesn't exist, create a new user
      const password = Math.random().toString(36).slice(-8); // Generate a random password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user = new User({ name, email, avatar, password: hashedPassword });
      await user.save();
    };

    //Jwt Token generation can be added here
    const token = jwt.sign(
      { name: user.name, email: user.email, _id: user._id, avatar: user.avatar },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    // Successful login
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(handleError(500, "Server Error in auth Controller"));
  }
};
// Logout Controller
export const Logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    // Successful login
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(handleError(500, "Server Error in auth Controller"));
  }
};
