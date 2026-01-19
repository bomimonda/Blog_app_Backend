import mongoose from "mongoose";

let item=new mongoose.Schema({
  name:{
    type:String,
    require:true

    },
    age:{
        type:Number,
        require:true,
        
    }
})

export default mongoose.model("Product",item)