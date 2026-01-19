import user from "../Model/RegistrationSchema.js"

export let Alluser=async(req,res)=>{
    let a= await user.find()
    console.log(a);
    

    if (a.length!==0) {
        res.status(200).json({
            statue:200,
            message:"All user get",
            data:a
        })
        
    }


    else{
          res.status(400).json({
            statue:400,
            message:" User not get",
         
        })
    }
}