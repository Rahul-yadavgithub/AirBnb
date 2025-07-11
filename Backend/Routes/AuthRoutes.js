const express = require("express");

const {signUp,login,logout}  = require("../controllers/AuthController.js");

const authRoute = express.Router();  // only take the router in this case 

authRoute.post("/signUp", signUp);

authRoute.post("/login", login);

authRoute.post("/logout", logout);

module.exports = authRoute;