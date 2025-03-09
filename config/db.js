   
const mongoose = require('mongoose'); // install to to handlle mongoDB and model 

// connect to mongoDB
async function connectToDB() {
    try{
     await mongoose.connect(process.env.MONGO_URL);
      console.log("data base connected successfully");
    }
    catch(error){
        console.log("database not connected" , error )
    }
}

module.exports = connectToDB


// ---------------------------  old way ------------------------------------//
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("Connected To MongoDB..."))
//   .catch((error) => console.log("Connection Failed To MongoDB!", error));
