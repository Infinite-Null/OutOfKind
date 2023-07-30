import mongoose from "mongoose";

const DonationSchema=new mongoose.Schema({
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
    address:{
        type:String,
        require:true
    },
    contact:{
        type:String,
        require:true
    },
    image1:{
        type:String,
        require:true
    },
    image2:{
        type:String,
        require:true
    },
    image3:{
        type:String,
        require:true
    },
    avaliable:{
        type:Boolean,
        require:true
    }
},{
    timestamps:true
})

module.exports=mongoose.models.donation||mongoose.model('donation',DonationSchema)