const express = require("express");

const isAuth = require("../middleware/isAuth.js");

const {getCurrentUser} = require("../controllers/userController.js");

const userRouter = express.Router();

userRouter.get("/currentuser",isAuth, getCurrentUser);

module.exports = userRouter;