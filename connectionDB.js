const mongoose = require("mongoose");

async function connectMongoDB(url){
    return mongoose.connect(url)
    .then(()=>console.log("Successfully MongoDB Connected"))
    .catch((err)=>{
        console.log("error in connecting Mongo: ", err);
    })
}
module.exports = connectMongoDB;
