import cloudinary from "../config/cloudinary.js";
import Blog from "../models/blog.model.js";
import { handleError } from "./../helpers/handleError.js";
import { encode } from "entities";

// Add blog logic goes here
export const addBolg = async (req, res, next) => {
  const data = JSON.parse(req.body.data);

  try {
    // Parse blog data from body
    const data = JSON.parse(req.body.data);

    // Upload featured image (if provided)
    let featuredImage = "";
    if (req.file) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "mern-blog",
          resource_type: "auto",
        });
        featuredImage = uploadResult.secure_url;
      } catch (err) {
        return next(handleError(500, "Image upload failed: " + err.message));
      }
    }

    // Save blog to DB
    const blog = new Blog({
      category: data.category,
      title: data.title,
      author: data.author,
      slug: data.slug,
      featuredImage,
      blogContent: encode(data.blogContent || ""),
    });

    await blog.save();

    res.status(201).json({
      success: true,
      message: "New blog added successfully",
      blog,
    });
  } catch (error) {
    next(handleError(500, "Error in add blog controller"));
  }
};
// Show all blog logic goes here
export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name")
      .populate("category", "name")
      .sort({ created_at: -1 })
      .lean()
      .exec();

    res.status(200).json({
      blogs,
    });
  } catch (error) {
    next(handleError(500, "Error from blog controller"));
  }
};
// // Show one blog logic goes here
export const getBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;

    const blog = await Blog.findById(blogid)
      .populate("author", "name")
      .populate("category", "name")
      .lean()
      .exec();
    if (!blog) return next(handleError(404, "Blog not found"));

    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, "Error from blog controller"));
  }
};
// // Update blog logic goes here
export const updateBlog = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const { blogid } = req.params;
    const blog = await Blog.findByIdAndUpdate(
      blogid,
      {
        name,
        slug,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Blog updated",
      blog,
    });
  } catch (error) {
    next(handleError(500, "Error from blog controller"));
  }
};
// // Delete blog logic goes here
export const deleteBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    await Blog.findByIdAndDelete(blogid);

    res.status(200).json({
      success: true,
      message: "Blog deleted",
    });
  } catch (error) {
    next(handleError(500, "Error from blog controller"));
  }
};
