import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../uploads/profile-image");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique file naming
  },
});



const fileFilter = (req, file, cb) => {
  const allowedExtensions = /\.(jpg|jpeg|png|svg|webp)$/i;
  if (allowedExtensions.test(path.extname(file.originalname))) {
      cb(null, true);
  } else {
      cb(new Error('Invalid file type. Only JPG, PNG, SVG, and WEBP are allowed.'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

  export default upload;