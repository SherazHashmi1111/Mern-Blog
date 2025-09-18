import Comment from "../models/comment.model.js";
import { handleError } from "./../helpers/handleError.js";

// Add category logic goes here
export const addComment = async (req, res, next) => {
  try {
    const data = req.body;

    const newComment = new Comment({
      comment: data.comment,
      author: data.userid,
      blogid: data.blogid,
    });

    await newComment.save();

    res.status(200).json({
      success: true,
      message: "Comment submitted",
      comment: newComment,
    });
  } catch (error) {
    next(handleError(500, "Error from comment controller"));
  }
};
// Get all comments
export const getAllComments = async (req, res, next) => {
  try {
    const { blogid } = req.params;

    // Validate that blogid is provided
    if (!blogid) {
      return next(handleError(400, "Blog ID is required"));
    }

    // Find comments by blog ID
    const comments = await Comment.find({ blogid })
      .sort({ createdAt: -1 }).populate("author", "name avatar")
      .lean()
      .exec();

    // Return 404 only if blog ID is valid but no comments exist
    if (!comments || comments.length === 0) {
      return next(handleError(404, "No comments found for this blog"));
    }

    // Success response
    res.status(200).json({ comments });
  } catch (error) {
    next(handleError(500, "Error fetching comments"));
  }
};

// Update category logic goes here
// export const updateCategory = async (req, res, next) => {
//   try {
//     const { name, slug } = req.body;
//     const { categoryid } = req.params;
//     const category = await Category.findByIdAndUpdate(
//       categoryid,
//       {
//         name,
//         slug,
//       },
//       { new: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Category updated",
//       category,
//     });
//   } catch (error) {
//     next(handleError(500, "Error from category controller"));
//   }
// };
// Delete category logic goes here
// export const deleteCategory = async (req, res, next) => {
//   try {
//     const { categoryid } = req.params;
//     await Category.findByIdAndDelete(categoryid);

//     res.status(200).json({
//       success: true,
//       message: "Category deleted",
//     });
//   } catch (error) {
//     next(handleError(500, "Error from category controller"));
//   }
// };
