import posts from "../Model/Blogpost.js"
export const PostDelete=async (req,res)=>{
let{id}=req.body
console.log(id);
console.log("kummmmm");

try {
    let data=await posts.findByIdAndDelete(id)
console.log(data);
res.json({status:200,success:true,data:data})
} catch (error) {
    res.json({status:400,success:false})
}

}

