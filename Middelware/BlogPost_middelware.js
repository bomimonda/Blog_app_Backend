import { v2 as cloudinary } from "cloudinary";
import Post from "../Model/Blogpost.js"
import fs from "fs"
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_key, // Click 'View API Keys' above to copy your API secret
});

export let check=async(req,res)=>{
   try {
     let path1=req.file.path
      let date=new Date()
    console.log(req.body);
    let{Titel,Information,userid}=req.body
    console.log(req.file);
    let result=await cloudinary.uploader.upload(path1)
   console.log(result.secure_url);
   let data=await Post.insertOne({
    Image:result.secure_url,
    Titel,
    Information,
    userid,
    Day:date

   })

   if (data) {
     fs.unlink(req.file.path, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Delete file");
        }
      });
   }
   res.status(200).json({
    message:{
        status:200,
        data:"Post Successfull"
    }
   })
   } catch (error) {
    
   }
  
    

}