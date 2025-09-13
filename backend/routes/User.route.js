import express from "express";
const UserRoute = express.Router();

import { getUser } from "../controllers/User.controller.js";

UserRoute.get("/get-user/:userid", getUser);

export default UserRoute;
