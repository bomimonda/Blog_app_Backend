import express from "express";
import crypto from "crypto";
import path from "path";
import { AllBlog } from "../Controller/Post_Controller.js";
import fs from "fs";
import multer from "multer";
import { Getuser } from "../Controller/Register_Controller.js";
import { Setuser } from "../Controller/Register_Controller.js";
import {
  productDelete,
  productGet,
  ProductUpdate,
} from "../Controller/Curd_Controller.js";
import { productadd } from "../Controller/Curd_Controller.js";
import { setimage } from "../Controller/Post_Controller.js";
import { Logauth } from "../Middelware/auth.js";
import { tokenverify } from "../Controller/Register_Controller.js";
import { check } from "../Middelware/BlogPost_middelware.js";
import { Likes1 } from "../Controller/Likes_Controller.js";
import { Forget } from "../Controller/Forget.js";
import { Singeluser } from "../Controller/Singeluser.js";

let route = express.Router();
import { UserBlog } from "../Controller/Post_Controller.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file222");

    console.log(file);
    cb(null, "./Images");
  },
  filename: function (req, file, cb) {
    console.log(file);

    crypto.randomBytes(12, (err, bytes) => {
      let fn = bytes.toString("hex") + path.extname(file.originalname);
      console.log("fn");

      console.log(fn);

      cb(null, fn);
    });
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  },
});



import { dislike } from "../Controller/Likes_Controller.js";
import { Comments } from "../Controller/Comments_controller.js";
import { password } from "../Controller/Password.js";
import { Alluser } from "../Controller/Userfind.js";
import { PostDelete } from "../Controller/Postdelete.js";

const upload = multer({ storage: storage });

route.post("/", Getuser);
route.post("/postdelete", PostDelete);
route.post("/singeluser", Singeluser);
// route.post("/setUser",upload.single("file"), Setuser);
route.post("/setUser", Setuser);
route.get("/Products", Logauth, productGet);
route.post("/Product", productadd);
route.delete("/productDelete/:id", Logauth, productDelete);
route.put("/productUpdate/:id", Logauth, ProductUpdate);
route.get("/userget", Logauth, tokenverify);
route.post("/Blogpost", upload.single("file"), check);
route.get("/MyBlog",UserBlog)
route.get("/AllBlog",AllBlog)
route.post("/setimage",upload.single("file"),setimage)
route.post("/postlikes",Likes1)
route.delete("/deletelike/:id",dislike)
route.post("/Comments",Comments)
route.post("/forgetpassword",Forget)
route.post("/setpassword",password)
route.get("/Getall",Alluser)


export default route;
