import mongoose, { Schema, Types } from "mongoose";
import validator from "validator"
import jwt from "jsonwebtoken"

let Register=new mongoose.Schema({
    Image:{
     type:String,
    require:true,
    },

  checked:{
 type:String,
    require:true,
    },


    skills:[],
Username:{
     type:String,
    require:true,
    trim:true,
    minlength:[3,"Username minimum character 3"]
},

email:{
     type:String,
    require:true,
    unique:true,
    lowercase: true,
     validate: {
      validator: validator.isEmail, 
      message: 'Please provide a valid email address', 
    },
    
    
},

Title:{
    type:String,
    require:true
},
Location:{
     type:String,
    require:true
},

Phone:{
     type:String,
    require:true
},


Organization:{
     type:String,
    require:true
},
password:{

    type:String,
   
    require:true,
   
    minlength:[8,"minimum length must be 8"]
}
})



Register.methods.Token= async function () {
    try {
        return jwt.sign({
            userid:this._id.toString(),
            useremail:this.email,
            Image:this.Image
        },
        "Coderz",
         { expiresIn: '7d' }
    
    )
        
    } catch (error) {
        
    }
    
}





export default mongoose.model("users",Register)