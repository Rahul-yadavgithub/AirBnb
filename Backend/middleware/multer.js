const multer = require("multer"); 

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./Public");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

module.exports = upload; 
