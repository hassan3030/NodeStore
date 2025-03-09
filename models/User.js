const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity"); // installed to make complex password
const jwt = require('jsonwebtoken'); // installed to make token

// User Schema
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      default: false, // default value
    },
  },
 
  { timestamps: true } 
   // object to In Mongoose, { timestamps: true } is an option that automatically adds two fields to your schema:
 // 1️⃣ createdAt – Stores the creation date of the document.
 // 2️⃣ updatedAt – Updates every time the document is modified.
//  as
//  {
//   "createdAt": "2024-03-03T12:00:00.000Z",
//   "updatedAt": "2024-03-03T12:00:00.000Z",
//  }
  
  
);

 //make a token
  //  sign(payload data  , SECRET_KEY , time to finish ) without time is forever 
  // {expiresIn:"6d"} ==> 6 days
  // {expiresIn:"6h"} ==> 6 hours
  // {expiresIn:"6m"} ==> 6 minutes
  // {expiresIn:"6s"} ==> 6 seconds
//------------------------------------------------------
// Generate Token
// not arrow function because we need to use this
UserSchema.methods.generateToken = function() {
  return jwt.sign({ id: this._id, isAdmin: this.isAdmin },process.env.JWT_SECRET_KEY);
}
// UserSchema is a class and we can add methods to it
// generateToken is a method that generates a token for the user
// this refers to the user object from schema
//------------------------------------------------------


// User Model
const User = mongoose.model("User", UserSchema);

// Validate Register User
function validateRegisterUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    username: Joi.string().trim().min(2).max(200).required(),
    password: passwordComplexity().required(), // passwordComplexity => password Complexity
  });
  return schema.validate(obj);
}

// Validate Login User
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(6).required(),
  });
  return schema.validate(obj);
}

// Validate Change Password
function validateChangePassword(obj) {
  const schema = Joi.object({
    password: Joi.string().trim().min(6).required(),
  });
  return schema.validate(obj);
}

// Validate Update User
function validateUpdateUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).email(),
    username: Joi.string().trim().min(2).max(200),
    password: Joi.string().trim().min(6),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  validateLoginUser,
  validateRegisterUser,
  validateUpdateUser,
  validateChangePassword
};
