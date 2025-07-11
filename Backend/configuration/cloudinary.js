const { v2: cloudinary } = require("cloudinary");  // V2: cloudinary means v2 version of the cloudinary 

const fs = require("fs"); // fs ---> means File System 


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });


const uploadOnCloudinary = async(filepath) =>{

    try{
        if(!filepath){
            return null;
        }

        const uploadResult = await cloudinary.uploader.upload(filepath);
        try{
            fs.unlinkSync(filepath);
        }
        catch(unlinkErr){
            console.warn(`failed to delete local file: ${unlinkErr.message}`);
        }
        return uploadResult.secure_url;

    }
    
    catch (err) {
    console.error("Cloudinary upload failed:", err.message);
    return null;
  }

}

module.exports = uploadOnCloudinary;