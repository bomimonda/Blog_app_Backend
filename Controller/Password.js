import users from "../Model/RegistrationSchema.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

export let password=async(req,res)=>{
    let{Token,password,confirm}=req.body
    console.log(req.body);
    let verify=jwt.verify(Token,"forget")
    console.log(verify.email);
    let a=await users.find({email:verify.email})
    console.log(a);
    let changepassword = await bcrypt.hash(password, 10);
      a[0].password=changepassword
       
      console.log(a);
      let b=await users.findByIdAndUpdate(a[0]._id,a[0])
      console.log(b);
      

      if (a.length>0) {
        res.status(200).json({
          status:200,
          message:"reset password successfully",

        })
      }
      
    //   await a.save()
    
    
}