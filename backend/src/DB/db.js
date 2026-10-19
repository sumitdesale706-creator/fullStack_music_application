const mongoose = require("mongoose");

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected Successfully");
    }catch(err){
        console.log(`Error is:- ${err.message}`);
    }
}

module.exports = connectDB;