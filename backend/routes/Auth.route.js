import express from "express";
const AuthRoute = express.Router();

import { Register, Login, GoogleLogin, Logout } from "../controllers/Auth.controller.js";

AuthRoute.post("/register", Register);
AuthRoute.post("/login", Login);
AuthRoute.post("/google-login", GoogleLogin);
AuthRoute.get("/logout", Logout);

export default AuthRoute;