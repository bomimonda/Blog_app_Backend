import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv";
import User from "./Model/RegistrationSchema.js";
import route from "./Routes/Router.js";
 dotenv.config();
let app = express();
app.use(express.json());
app.use(cors())


let port=process.env.PORT

let Url=process.env.MONGODB_URI







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