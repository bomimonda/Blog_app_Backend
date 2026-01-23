import dotenv from "dotenv";
dotenv.config(); // 👈 FIRST LINE
import { v2 as cloudinary } from "cloudinary";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import route from "./Routes/Router.js";
// import cloudinary from "./config/cloudinary.js";
//  dotenv.config();
let app = express();
app.use(express.json());
app.use(cors({
  origin: "*", // or your frontend URL e.g. "https://my-frontend.vercel.app"
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
});

let port=process.env.PORT

let Url=process.env.MONGODB_URI


// console.log("API KEY:", cloudinary.config().api_key);





mongoose
  .connect(Url)
  .then(() => {
    console.log("connected");
    app.listen(port, () => {
      console.log(`port number ${port}`);
    });
  })
  .catch((error) => {});


  app.use("/",route)