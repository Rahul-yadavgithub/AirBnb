
const User = require("../models/UserModel");

const genToken = require("../configuration/token.js");

const bcrypt = require("bcryptjs");

// SignUp Authuntication 

const signUp = async(req, res) => {
    try{

        let {name, email, password} = req.body;

        let userExit = await User.findOne({email});
        

        if(userExit){
            return res.status(404).json({message : "User is Already Exit "});
            
        }

        let hashPassword = await bcrypt.hash(password, 10);

        let user = await User.create({name, email, password : hashPassword });

        let token = await genToken(user._id);

        res.cookie("token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT  === "production",
            sameSite : "strict",
            maxAge : 7*24*60*60*1000,
        })

        return res.status(201).json(user);
    }
    catch(error){
        return res.status(500).json({message : `Signup Error ${error}`});

    }
};

// Login Authntication 

const login = async(req, res) =>{
    try{
        let {email, password} = req.body;

        let user = await User.findOne({email}).populate("listing", "title image1 image2 image3 description rent category city landmark");

        if(!user){
            return res.status(404).json({message: "User is not Exit"});
        }

        let isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(404).json({message: "Incorrect Password"});
        }

        let token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly : true,
            secure: process.env.NODE_ENVIRONMENT === "production",
            sameSite : "strict",
            maxAge : 7*24*60*60*1000,
        })
        return res.status(200).json(user);

    }
    catch(error){
        return res.status(500).json({message: `Login Error ${error}`});

    }
};

const logout = async(req, res) => {
    try{
        res.clearCookie("token");
        return res.status(201).json({message: "Logout Successfully"});
    }
    catch(error){
        return res.status(500).json({message: `Logout Error ${error}`});
    }
}


module.exports = {signUp, login, logout};
