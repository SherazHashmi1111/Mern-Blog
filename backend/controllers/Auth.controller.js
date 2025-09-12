import  handleError from '../helper/handleError.js'
import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return next(handleError(400, "All fields are required"));
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) return next(handleError(409, "Email already in use"));
        // Hashed password first before saving to DB
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        next(handleError(500, "Server error in auth.controller - register"));
    }
};