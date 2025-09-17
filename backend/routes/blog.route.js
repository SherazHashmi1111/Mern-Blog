// ===============================
// Imports
// ===============================
import express from "express";
import upload from "../config/multter.js";
import { addBolg, deleteBlog, getAllBlogs, getBlog, updateBlog} from "../controllers/blog.controller.js";

const BlogRoute = express.Router();

// ===============================
// User Routes
// ===============================

// ✅ Get a user by ID
// Example: GET /api/user/get-user/12345
BlogRoute.post("/add", upload.single("file"), addBolg);
BlogRoute.get("/all", getAllBlogs);
BlogRoute.delete("/delete/:blogid", deleteBlog);
BlogRoute.get("/blog/:blogid", getBlog);
BlogRoute.post("/all", upload.single("file"), deleteBlog);
BlogRoute.put("/edit/:blogid", upload.single("file"), updateBlog);

// ✅ Update user by ID
// Accepts form-data with optional file upload (`file` field)
// Example: PUT /api/user/update-user/12345
// BlogRoute.put("/update-user/:userid", upload.single("file"), updateUser);

// ===============================
// Export
// ===============================
export default BlogRoute;
