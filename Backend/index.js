const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const connectDb = require("./configuration/db.js");
const authRoute = require("./Routes/AuthRoutes.js");

const userRouter = require("./Routes/UserRoute.js");
const listingRouter = require("./Routes/listingRoutes.js");
const bookingRouter = require("./Routes/bookingRoutes.js");

const port = process.env.PORT ;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'https://airbnb-fronted.onrender.com', 
    credentials: true               
}));

app.use("/api/auth", authRoute);

app.use("/api/user" ,userRouter);

app.use("/api/listing", listingRouter);

app.use("/api/booking",bookingRouter);

app.listen(port, () => {
    connectDb();
    console.log(`This server is running on : http://localhost:${port}`);
});
