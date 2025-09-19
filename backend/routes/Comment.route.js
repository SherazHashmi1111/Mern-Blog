import  express  from "express";
import { addComment, commentCount, getAllComments } from "../controllers/Comment.controller.js";


const CommentRoute = express.Router();

CommentRoute.post("/add", addComment);
CommentRoute.get("/comments/:blogid", getAllComments);
CommentRoute.get("/comment-count/:blogid", commentCount);

export default CommentRoute;
