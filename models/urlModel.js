const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema({
    shortId :{
        type:String,
        required: true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true,
    },
    totalVisitHistory:[{ 
        timestamp :{ 
            type: Number
        }   
    }],
    
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    }

}, {timestamps:true});

const URLmodel = mongoose.model("URLmodel", urlSchema);

module.exports = URLmodel;