import { handleError } from "./../helpers/handleError.js";
import Category from "./../models/category.model.js";

// Add category logic goes here
export const addCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const category = new Category({ name, slug });

    await category.save();

    res.status(200).json({
      success: true,
      message: "New category added",
    });
  } catch (error) {
    next(handleError(500, "Error from category controller"));
  }
};
// Show all category logic goes here
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 }).lean().exec();

    res.status(200).json({
      categories,
    });
  } catch (error) {
    next(handleError(500, "Error from category controller"));
  }
};
// Show one category logic goes here
export const getCategory = async (req, res, next) => {
  try {
    const { categoryid } = req.params;
    console.log(categoryid);

    const category = await Category.findById(categoryid);
    if (!category) return next(handleError(404, "Category not found"));

    res.status(200).json({
      category,
    });
  } catch (error) {
    next(handleError(500, "Error from category controller"));
  }
};
// Update category logic goes here
export const updateCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const { categoryid } = req.params;
    const category = await Category.findByIdAndUpdate(
      categoryid,
      {
        name,
        slug,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Category updated",
      category,
    });
  } catch (error) {
    next(handleError(500, "Error from category controller"));
  }
};
// Delete category logic goes here
export const deleteCategory = async (req, res, next) => {
  try {
    const { categoryid } = req.params;
    await Category.findByIdAndDelete(categoryid);

    res.status(200).json({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    next(handleError(500, "Error from category controller"));
  }
};
