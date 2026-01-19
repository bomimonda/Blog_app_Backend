import Likes from "../Model/Likes.js"
import Post from "../Model/Blogpost.js"




export let Likes1=async(req,res)=>{
    console.log(req.body);
    let{postid,userid,name,Image}=req.body
    let a=await Likes.insertOne({postid,userid,name,Image})
    console.log(a);

    let b=await Likes.find()
    console.log("b");

     let c= await Post.aggregate([{$lookup:{from:"likes",localField:"_id",foreignField:"postid",as:"Like"}},{
            $lookup: {
              from: "users",
              localField: "userid",  // Using the posts array from previous lookup
              foreignField: "_id",
              as: "Detail"
            }
          },{$lookup:{from:"comments",localField:"_id",foreignField:"postid",as:"comment"}}])
    
    
    // console.log(b);
    

    res.status(200).json({
        success:true,
        status:200,
        data:c
    })
    
    

}



export let dislike=async(req,res)=>{
  let{id}=req.params
  console.log(id);
  
    let a=await Likes.findByIdAndDelete(id)
    console.log(a);
    
    if (a!==null) {
      let c= await Post.aggregate([{$lookup:{from:"likes",localField:"_id",foreignField:"postid",as:"Like"}},{
             $lookup: {
               from: "users",
               localField: "userid",  // Using the posts array from previous lookup
               foreignField: "_id",
               as: "Detail"
             }
           },{$lookup:{from:"comments",localField:"_id",foreignField:"postid",as:"comment"}}])
    console.log(c);

    
    
    // console.log(b);
    

    res.status(200).json({
        success:true,
        status:200,
        data:c
    })
    }
}