import { timeStamp } from "console";
import mongoose from "mongoose";

const BlogSchema=new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    users:{
        type: mongoose.Types.ObjectId,
        ref:'users',
        required:true
    },
    title:{
        type:String,
        require:true
    },
    discription:{
        type:String,
        require:true
    },
    Comments:{
        type:Array
    },
},{
    timestamps:true
})

module.exports=mongoose.models.blogs||mongoose.model('blogs',BlogSchema)