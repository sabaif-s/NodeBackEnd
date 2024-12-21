
const multer = require('multer');
const path = require('path');

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../upload')
    cb(null, uploadPath); // Set the upload directory
  },
  filename: (req, file, cb) => {
    // Create a unique filename using the original name and current timestamp
    const uniqueSuffix = Date.now() + '-' + Math.random().toString(36).substring(2, 15);
    const fileName = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
    cb(null, fileName); // Set the filename
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

module.exports=upload;

