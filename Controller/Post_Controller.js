import posts from "../Model/Blogpost.js";
import users from "../Model/RegistrationSchema.js"
import Likes from "../Model/Likes.js"
import redisClient from "../redisclient.js";
import { v2 as cloudinary } from "cloudinary";
import { log } from "node:console";


cloudinary.config({
  cloud_name: "dalzcsdsz",
  api_key: "321475811611578",
  api_secret: "KK-r3-HL3V3fzm_NDDKkY6vzxQI", // Click 'View API Keys' above to copy your API secret
});

export let UserBlog = async (req, res) => {
  try {

    let a = await posts.find();
     
    res.status(200).json({
      message: {
        status: 200,
        message: "Request SuccessFull",
        data: a,
      },
    });

    console.log(a);
  } catch (error) {
    res.status(400).res.json({
      message: {
        status: 200,
        message: "Request SuccessFull",
      },
    });
  }
};




export const AllBlog=async(req,res)=>{

  try {
    
//  const cachedPosts = await redisClient.get("allPosts");
//    console.log(cachedPosts);
//    console.log("loooooa");
   
//    const start = Date.now();

// const data = JSON.parse(cachedPosts);
// console.log("Time:", Date.now() - start, "ms");
//     if (cachedPosts) {


      
//  return res.status(200).json({
//           success: true,
//           status: 200,
//             from:"redis",
//           message: "All Post Get",
          
//           data: JSON.parse(cachedPosts),
//         });

    
//     }
      let a=await users.find()
      console.log("b");
      
      let b=await Likes.find().populate("userid").populate("postid")
      // console.log(b);
      
   
   
    

    //   console.log(e);
      

    // let w= await Post.aggregate([{$lookup:{from:"users",localField:"userid",foreignField:"_id",as:"Detail"}}])
     let c= await posts.aggregate([{$lookup:{from:"likes",localField:"_id",foreignField:"postid",as:"Like"}},{
        $lookup: {
          from: "users",
          localField: "userid",  // Using the posts array from previous lookup
          foreignField: "_id",
          as: "Detail"
        }
      },{$lookup:{from:"comments",localField:"_id",foreignField:"postid",as:"comment"}}
  ])


      // console.log(c)
      // let d=await c.find()
      // console.log(d);
      
      
   
    // let data1={}

    // a.forEach((val1,ind)=>{
    //     data1[val1.Username]=w.filter((val,ind)=>{
    //         return val.Detail[0].Username==val1.Username
    //     })
    // })
// res.status(200).json(data1)

// await redisClient.setEx("allPosts", 120, JSON.stringify(c));

 res.status(200).json({
          success: true,
          status: 200,
          message: "All Post Get",
          data:c
        });

    // console.log(data);
  }
 catch (error) {
     res.status(400).json({
          success: false,
          status: 400,
          message: "User not Found",
        });
  }
    
    

}





export const setimage=async(req,res)=>{
  console.log("file");
  console.log(req.file);
 if (req.file!==undefined) {
   
  let path1=req.file.path
  // let{email,Username}=req.body
    let result=await cloudinary.uploader.upload(path1)
   console.log(result.secure_url);
  // console.log(req.file);
    const { Username, email, password,checked ,Image,Title,Location,Phone,Organization,skills} = req.body;
  console.log(req.body);
  let date=new Date()

  let a=await users.updateOne({email:email},{$set:{Image:result.secure_url,Username:Username,Title:Title,Phone:Phone,Location:Location,Organization:Organization,checked:checked,skills:skills}})
    if (a!==null) {
      res.status(200).json({
          success: true,
          status: 200,
          data:a,
          message: "Profile update successfully",
          
        })
    }
 }else{
  
 const { Username, email, password,checked ,Image,Title,Location,Phone,Organization,skills} = req.body;
let c=await users.find({email})
console.log("c");

console.log(c);
if (c[0].Image!=="Not") {
  // if (c[0].skills.length>0) {
  //    let a=await users.updateOne({email:email},{$set:{Username:Username,Title:Title,Phone:Phone,Location:Location,Organization:Organization,checked:checked,skills:skills}})
  //   if (a!==null) {
  //     res.status(200).json({
  //         success: true,
  //         status: 200,
  //         data:a,
  //         message: "Profile update successfully",
          
  //       })
  //   }
  // }
  

  let a=await users.updateOne({email:email},{$set:{Username:Username,Title:Title,Phone:Phone,Location:Location,Organization:Organization,checked:checked,skills:skills}})
    if (a!==null) {
      res.status(200).json({
          success: true,
          status: 200,
          data:a,
          message: "Profile update successfully",
          
        })
    }
}



else{
  let a=await users.updateOne({email:email},{$set:{Image:"Not",Username:Username,Title:Title,Phone:Phone,Location:Location,Organization:Organization,checked:checked,skills:skills}})
    if (a!==null) {
      res.status(200).json({
          success: true,
          status: 200,
          data:a,
          message: "Profile update successfully",
          
        })
    }
}
 }



  console.log("a");
  
    console.log(a);
    
  
  // console.log(req.file);
  

}