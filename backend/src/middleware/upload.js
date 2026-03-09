// middleware/upload.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure 'uploads' folder exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // unique filename: timestamp + original extension
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

// File filter (optional, only images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;