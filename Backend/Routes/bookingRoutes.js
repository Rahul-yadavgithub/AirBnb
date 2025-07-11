const express = require("express");

const isAuth = require("../middleware/isAuth.js");

const {createBooking, cancelBooking} = require("../controllers/bookingController.js");

const bookingRouter = express.Router();

bookingRouter.post("/create/:id" ,isAuth, createBooking)

bookingRouter.delete("/cancel/:id",isAuth, cancelBooking)

module.exports = bookingRouter;
