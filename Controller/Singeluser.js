
import users from "../Model/RegistrationSchema.js"
export  const Singeluser= async (req,res)=>{
console.log(req.body);
let{id}=req.body
try {
let user1=await users.findById(id)
    console.log(user1);
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    
    res.json({status:200,successfull:true,data:user1})
} catch (error) {
     res.json({status:400,successfull:false,data:"Not Found"})
}





}