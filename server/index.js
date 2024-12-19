import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./routes/Api.js";
import multer from "multer";

dotenv.config();


const app = express();
const port = process.env.PORT || 9001;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

app.use('/uploads', express.static('uploads'));

app.use(cookieParser());
app.use(express.json());
app.use('/', router);


app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      return res.status(423).json({ error: err.message });
    }
    next();
  });

const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});

mongoose.connect(databaseURL)
.then(() => console.log("Database Connection successful."))
.catch((err) => console.error(err))