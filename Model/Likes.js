import mongoose, { Schema } from "mongoose"




let Like=new mongoose.Schema({
    postid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts"
    },userid:{
          type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    name:{
        type:String,
        require:true
    },
    Image:{
        type:String,
        require:true
    }
      
})


export default mongoose.model("likes",Like)