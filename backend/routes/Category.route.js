import  express  from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controllers/Caategory.controller.js";

const CategoryRoute = express.Router();

CategoryRoute.post("/add", addCategory);
CategoryRoute.get("/all", getAllCategories);
CategoryRoute.get("/category/:categoryid", getCategory);
CategoryRoute.put("/update/:categoryid", updateCategory);
CategoryRoute.delete("/delete/:categoryid", deleteCategory);

export default CategoryRoute;
