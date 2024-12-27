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



const imageFilter = (req, file, cb) => {
  const allowedExtensions = /\.(jpg|jpeg|png|svg|webp)$/i;
  if (allowedExtensions.test(path.extname(file.originalname))) {
      cb(null, true);
  } else {
      cb(new Error('Invalid file type. Only JPG, PNG, SVG, and WEBP are allowed.'));
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  imageFilter,
});



// File upload function

const uploadFilesDir = path.join(__dirname, "../uploads/message-files");
if (!fs.existsSync(uploadFilesDir)) {
  fs.mkdirSync(uploadFilesDir, { recursive: true });
}


const storageFiles = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, uploadFilesDir);
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique file naming
  },
});



const fileFilter = (req, file, cb) => {
  const allowedExtensions = /\.(jpg|jpeg|png|svg|webp|doc|docs|xls|xlsx|pdf|csv)$/i;
  if (allowedExtensions.test(path.extname(file.originalname))) {
      cb(null, true);
  } else {
      cb(new Error('Invalid file type. Only JPG, PNG, SVG, WEBP, DOC, DOCS, XLSX, XLS, PDF, CSV are allowed.'));
  }
};


export const uplaodFiles = multer({
  storage: storageFiles,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});