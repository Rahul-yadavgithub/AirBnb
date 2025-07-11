const express = require("express");

const listingRouter = express.Router();

const isAuth = require("../middleware/isAuth.js");

const upload = require("../middleware/multer.js");

const {addListing,getListing,findListing,updateListing,deleteListing,ratingListing,searchListing} = require("../controllers/listingController.js");


listingRouter.post("/add", isAuth, upload.fields([
    {name: "image1", maxCount: 1},
    {name :"image2", maxCount:1},
    {name :"image3", maxCount:1}

]), addListing);

listingRouter.get("/get", getListing);
listingRouter.get("/findListingById/:id",isAuth, findListing);
listingRouter.delete("/delete/:id",isAuth, deleteListing);
listingRouter.post("/rating/:id",isAuth, ratingListing);
listingRouter.get("/search", searchListing);

listingRouter.post("/update/:id", isAuth, upload.fields([
    {name: "image1", maxCount:1},
    {name: "image2", maxCount:1},
    {name: "image3", maxCount:1}

]), updateListing);

module.exports = listingRouter;