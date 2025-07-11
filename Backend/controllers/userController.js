
const User = require("../models/UserModel.js");

const getCurrentUser = async(req ,res) =>{
    try{
        let user = await User.findById(req.userId)
        .select("-password")
        .populate("listing", "title image1 image2 image3 description rent category city landmark isBooked host rating")
        .populate("booking","title image1 image2 image3 description rent category city landmark isBooked host rating")

        if(!user){
           return res.status(400).json({message: "User Doesn't Found"})
        }
       return res.status(200).json(user);
    }
    catch(error){
       return res.status(500).json({message: `GetCurrent User ${error}`});
    }
}

module.exports = {getCurrentUser};