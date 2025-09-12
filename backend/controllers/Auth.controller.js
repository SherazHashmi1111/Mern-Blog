import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

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

export const Login = async (req, res, next) => {
  // You can implement login here later
};
