const mongoose = require("mongoose");

const Schema = mongoose.Schema; // we don't need to write each and every time mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    }, 
    email: {
        type : String,
        required: true,
    },
    password: {
        type : String, 
        required: true,
    },

    listing: [{
        type: Schema.Types.ObjectId,
        ref : "Listing"
    }],
    booking: [{
        type: Schema.Types.ObjectId,
        ref : "Listing"
    }],


}, {timestamps: true})

const User = mongoose.model("User", UserSchema);

module.exports = User;