const mongoose = require("mongoose");


async function connection(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected")
    } catch (error) {
        console.log(error)
    }
         
}

connection();