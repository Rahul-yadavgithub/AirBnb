const Listing = require("../models/listingModel.js");
const Booking = require("../models/bookingModel.js");
const User = require("../models/UserModel.js");

const createBooking = async(req, res)=>{
    try{
        let {id} = req.params;
        let {checkIn, checkOut,totalRent} = req.body;

        if(!checkIn || !checkOut || !totalRent){
            return res.status(404).json({message:"Data is missing in the Backend"});
        }

        let listing = await Listing.findById(id);

        if(!listing){
            return res.status(404).json({message:"Listing is Not Found"});
        }

        if(new Date(checkIn) >= new Date(checkOut)){
            return res.status(400).json({message: "Invalid CheckIn and CheckOut Date"});
        }
        if(listing.isBooked){
            return res.status(400).json({message: "Listing is Already Booked"});
        }

        let booking = await Booking.create({
            checkIn,
            checkOut,
            totalRent,
            host: listing.host,
            guest: req.userId,
            listing: listing._id


        })

        await booking.populate("guest", "email");

    let user = await User.findByIdAndUpdate(req.userId,{
        $push:{booking:listing}
    },{new:true});

    if(!user){
        return res.status(404).json({message:"User is Not Found"});
    }

    listing.guest = req.userId;
    listing.isBooked =true;
    await listing.save();

    return res.status(201).json(booking);
    }
    catch(error){
        return res.status(500).json({message:`Booking Related Error ${error}`});

    }
}

const cancelBooking = async(req, res) =>{
    try{
        let {id} =  req.params;
        let listing = await Listing.findByIdAndUpdate(id, {isBooked:false});

        let user = await User.findByIdAndUpdate(listing.guest, {
            $pull :{booking: listing._id}
        },{new: true});

        if(!user){
            return res.status(404).json({message:"User is Not Found "});
        }

        return res.status(200).json({message:"Booking is Cancelled"});
    }
    catch(error){
        return res.status(500).json({message: `Error Related to Cancling the Booking`});
    }
}

module.exports = {createBooking, cancelBooking};