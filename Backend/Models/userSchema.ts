import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
    },
    liked:[{
        type: mongoose.Types.ObjectId,
        ref:'blogs',
    }],
    myBlog:[{
        type: mongoose.Types.ObjectId,
        ref:'blogs',
    }],
    myDonations:[{
        type: mongoose.Types.ObjectId,
        ref:'donation',
    }]
})

module.exports=mongoose.models.users||mongoose.model('users',UserSchema)