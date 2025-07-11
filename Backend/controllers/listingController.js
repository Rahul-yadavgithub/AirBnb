const uploadOnCloudinary = require("../configuration/cloudinary.js");
const Listing = require("../models/listingModel.js");
const User = require("../models/UserModel.js");

const addListing = async (req, res) => {
  try {
    const host = req.userId;
    const { title, description, rent, city, landmark, category } = req.body;

    if (!host || !title || !description || !rent || !city || !landmark || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.files || !req.files.image1 || !req.files.image2 || !req.files.image3) {
      return res.status(400).json({ message: "All images (image1, image2, image3) are required" });
    }

    const image1 = await uploadOnCloudinary(req.files.image1[0].path);
    const image2 = await uploadOnCloudinary(req.files.image2[0].path);
    const image3 = await uploadOnCloudinary(req.files.image3[0].path);

    const newListing = await Listing.create({
      title,
      description,
      rent,
      city,
      landmark,
      category,
      image1,
      image2,
      image3,
      host,
    });

    const user = await User.findByIdAndUpdate(
      host,
      { $push: { listing: newListing._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(201).json(newListing);
  } 
  catch (error) {
    console.error("Error in addListing:", error);
    return res.status(500).json({ message: `addListing Error: ${error.message}` });
  }
};

const getListing = async(req, res) => {
  try{
    let listing = await Listing.find().sort({createdAt : -1});
   return res.status(200).json(listing);
  }
  catch(error){
   return res.status(500).json({message :`getListing Error ${error}`});
  }

}

const findListing = async(req, res) =>{
  try{
    let {id} = req.params;
    let listing = await Listing.findById(id);

    if(!listing){
     return res.status(404).json({message:"Listing is Not Found"});
    }
    return res.status(200).json(listing);
  }
  catch(error){
    return res.status(500).json({message:`Find Listing Error ${error}`});
  }
}

const updateListing = async(req, res) =>{
  try{
    let {id} = req.params;
    let host = req.userId;
    let image1;
    let image2;
    let image3;
    const { title, description, rent, city, landmark, category } = req.body;

    if (!host || !title || !description || !rent || !city || !landmark || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }
     if(req.files.image1){
      image1 = await uploadOnCloudinary(req.files.image1[0].path);
     }
     if(req.files.image2){
      image2 = await uploadOnCloudinary(req.files.image2[0].path);
     }
     if(req.files.image3){
      image3 = await uploadOnCloudinary(req.files.image3[0].path);
     }

    const listing = await Listing.findByIdAndUpdate(id,{
      title,
      description,
      rent,
      city,
      landmark,
      category,
      image1,
      image2,
      image3,
      host
    },{new: true});

    return res.status(201).json(listing);


  }
  catch(error){
    return res.status(500).json({message:`Update Listing Error ${error}`});

  }
}

const deleteListing = async(req, res) =>{
  try{
    let {id} = req.params;
    let listing = await Listing.findByIdAndDelete(id);
    let user = await User.findByIdAndUpdate(listing.host, {
      $pull: {listing:listing._id}
    },{new:true})

    if(!user){
      return res.status(404).json({message:"user is Not Found"});
    }
    return res.status(201).json({message: "Listing Deleted"})

  }
  catch(error){
    return res.status(500).json({message: `Error In Deletion ${error}`});
  }
}

const ratingListing = async(req, res) =>{
  try{
    let {id} = req.params;
    let {rating} = req.body;
    
    let listing = await Listing.findById(id);

    if(!listing){
      return res.status(404).json({messsage:"Listing is Not Found "});
    }
    listing.rating = Number(rating);
    await listing.save();

    return res.status(200).json({rating: listing.rating});

  }
  catch(error){
    return res.status(500).json({message: `Rating Related Message ${error}`});

  }
}

const searchListing = async(req, res) =>{
  try{

    const {query} = req.query;

    if (!query){
      return res.status(404).json({message: "Search Query is Required"});
    }

    const listing = await Listing.find({
      $or :[
        {landmark: {$regex : query, $options: "i"}},
        {city :{$regex : query, $options : "i"}},
        {title :{$regex: query, $options : "i"}}
      ],
    });

    return res.status(200).json(listing);
  }
  catch(error){
    return res.status(500).json({message: `Search Error ${error}`});

  }
}

module.exports = {addListing,getListing,findListing,updateListing, deleteListing, ratingListing, searchListing};
