import  express  from "express";
import { addComment, getAllComments } from "../controllers/Comment.controller.js";


const CommentRoute = express.Router();

CommentRoute.post("/add", addComment);
CommentRoute.get("/comments/:blogid", getAllComments);
// CommentRoute.get("/all", getAllCategories);
// CommentRoute.get("/category/:categoryid", getCategory);
// CommentRoute.put("/update/:categoryid", updateCategory);
// CommentRoute.delete("/delete/:categoryid", deleteCategory);

export default CommentRoute;
