const mongoose = require("mongoose"); 
const Joi = require("joi"); // return ob error in console

// Book Scheama
const BookSchema = new mongoose.Schema( // stricted 
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 250,
    },
    author: {
      type: String,
      // type: mongoose.Schema.Types.ObjectId,
      required: true,
     // ref: "Author", // fk 
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    cover: {
      type: String,
      required: true,
      enum: ["soft cover", "hard cover"], // selected from between array
    },
  },
  { timestamps: true } 
  // add 2 fields is collection refer to time creation and update 
   // object to In Mongoose, { timestamps: true } is an option that automatically adds two fields to your schema:
 // 1️⃣ createdAt – Stores the creation date of the document.
 // 2️⃣ updatedAt – Updates every time the document is modified.
//  as
//  {
//   "createdAt": "2024-03-03T12:00:00.000Z",
//   "updatedAt": "2024-03-03T12:00:00.000Z",
//  }
);

// Book Model
const Book = mongoose.model("Book", BookSchema); // name of collection and schema

// Validate Create Book
function validateCreateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(250).required(),
    author: Joi.string().required(),
    description: Joi.string().trim().min(5).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().valid("soft cover", "hard cover").required(),
  });

  return schema.validate(obj);
}

// Validate Update Book
function validateUpdateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(250),
    author: Joi.string(),
    description: Joi.string().trim().min(5),
    price: Joi.number().min(0),
    cover: Joi.string().valid("soft cover", "hard cover"),
  });

  return schema.validate(obj);
}

module.exports = {
  Book,
  validateCreateBook,
  validateUpdateBook,
};
