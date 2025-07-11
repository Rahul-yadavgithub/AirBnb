const mongoose = require("mongoose");

const connectDb = async() =>{
    try{

        await mongoose.connect(process.env.MONGODB_URL);

        console.log("Our MOngodb Connected");
    }
    catch(error){
        console.log("Error in Connnecting", error);

    }
}

module.exports = connectDb;
