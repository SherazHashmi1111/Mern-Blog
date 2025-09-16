// ===============================
// Imports
// ===============================
import express from "express";
import upload from "../config/multter.js";
import { addBolg, deleteBlog, getAllBlogs} from "../controllers/blog.controller.js";

const BlogRoute = express.Router();

// ===============================
// User Routes
// ===============================

// ✅ Get a user by ID
// Example: GET /api/user/get-user/12345
BlogRoute.post("/add", upload.single("file"), addBolg);
BlogRoute.get("/all", getAllBlogs);
BlogRoute.delete("/delete/:blogid", deleteBlog);
// BlogRoute.post("/all", upload.single("file"), UpdateBlog);
// BlogRoute.post("/all", upload.single("file"), deleteBlog);

// ✅ Update user by ID
// Accepts form-data with optional file upload (`file` field)
// Example: PUT /api/user/update-user/12345
// BlogRoute.put("/update-user/:userid", upload.single("file"), updateUser);

// ===============================
// Export
// ===============================
export default BlogRoute;
