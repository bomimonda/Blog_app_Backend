import comments from "../Model/Comment.js"
import Post from "../Model/Blogpost.js"


export let Comments= async(req,res)=>{
    try {

     let{userid,postid,Comments,Image,userName,Time}=req.body

     let a= await comments.insertOne({userid,postid,Comments,Image,userName,Time})
     console.log(a);

      let c= await Post.aggregate([{$lookup:{from:"likes",localField:"_id",foreignField:"postid",as:"Like"}},{
             $lookup: {
               from: "users",
               localField: "userid",  // Using the posts array from previous lookup
               foreignField: "_id",
               as: "Detail"
             }
           },{$lookup:{from:"comments",localField:"_id",foreignField:"postid",as:"comment"}}])
     
     res.status(200).json({
        message:"Comment add",status:200,successs:true,data:c
     })
        
    } catch (error) {
         res.status(400).json({
        message:"Comment  error",status:200,successs:true
     })
    }
}