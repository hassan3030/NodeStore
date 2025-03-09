const mongoose = require("mongoose");
const Joi = require("joi"); // return ob error in console

const AuthorSchema = new mongoose.Schema({  // strict in schema
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength:3,
        maxlength:200,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength:3,
        maxlength:200,
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
        minlength:2,
        maxlength:100,
    },
    image: {
        type: String,
        default: "default-avatar.png"
    },
}, 
{ timestamps:true}
 // object to In Mongoose, { timestamps: true } is an option that automatically adds two fields to your schema:
 // 1️⃣ createdAt – Stores the creation date of the document.
 // 2️⃣ updatedAt – Updates every time the document is modified.
//  as
//  {
//   "createdAt": "2024-03-03T12:00:00.000Z",
//   "updatedAt": "2024-03-03T12:00:00.000Z",
//  }

);


const Author = mongoose.model("Author", AuthorSchema);

// Validate Create Author
function validateCreateAuthor(obj) {
    const schema = Joi.object({
      firstName: Joi.string().trim().min(3).max(200).required(),
      lastName: Joi.string().trim().min(3).max(200).required(),
      nationality: Joi.string().trim().min(2).max(100).required(),
      image: Joi.string(),
    });
  
    return schema.validate(obj);
  }
  
  // Validate Update Author
  function validateUpdateAuthor(obj) {
    const schema = Joi.object({
      firstName: Joi.string().trim().min(3).max(200),
      lastName: Joi.string().trim().min(3).max(200),
      nationality: Joi.string().trim().min(2).max(100),
      image: Joi.string(),
    });
  
    return schema.validate(obj);
  }

module.exports = {
    Author,
    validateCreateAuthor,
    validateUpdateAuthor
}