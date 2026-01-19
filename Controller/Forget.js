import users from "../Model/RegistrationSchema.js"
import jwt from "jsonwebtoken"



export let Forget= async (req,res) => {
   let {email}=req.body
  
       try {
         let a= await users.find({email})

         
   console.log(a);
   if (a.length!==0) {
             let token = jwt.sign({email},"forget")
         console.log(token);
    res.status(200).json({
        status:200,
        message:"Reques success",
        data:a,
        Token:token
  
  })

    
   }
else{
      res.status(400).json({
        status:400,
        message:"Please provide valid email",
       
    })
}


       } catch (error) {
      
       }
 
    
}