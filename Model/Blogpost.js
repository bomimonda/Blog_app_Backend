import mongoose from "mongoose"




let Post1=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    Image:{
        type:String,
        require:true
    },
    Titel:{
        type:String,
        require:true
    },
    Information:{
        type:String,
        require:true
    },
    Day:{
        type:String,
        require:"true"
    }
})

export default mongoose.model("posts",Post1)