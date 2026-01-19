import mongoose from "mongoose"


let Comment=new mongoose.Schema({
     postid:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"posts"
       },userid:{
             type:mongoose.Schema.Types.ObjectId,
           ref:"users"
       },
       Comments:{
        type:String,
        require:true
       },
       userName:{
         type:String,
        require:true
       },
       Image:{
          type:String,
        require:true
       },

        Time:{
          type:String,
        require:true
       }

    //    name:{
    //        type:String,
    //        require:true
    //    }
},
{
    timestamps:true
}


)


export default mongoose.model("comments",Comment)