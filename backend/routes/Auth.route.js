import express from "express";
const AuthRoute = express.Router();

import { Register, Login } from "../controllers/Auth.controller.js";

AuthRoute.post("/register", Register);
AuthRoute.post("/login", Login);

export default AuthRoute;