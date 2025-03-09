
const asyncHandler = require('express-async-handler'); // handle router by default
const {Author , validateCreateAuthor , validateUpdateAuthor} = require('../models/Author');




// http methods / verbs / rout handler

/**
 *  @desc    Get all authors
 *  @route   /api/authors
 *  @method  GET
 *  @access  public
 */
const getAuthors =asyncHandler( async (req , res )=>{
    const authors = await Author.find();
    if(authors) return res.status(200).json(authors);
    res.status(400).json({message : 'no authors'});
  })

  /**
 *  @desc    Get one authors
 *  @route   /api/authors/:id
 *  @method  GET
 *  @access  public
 */

  const getAuthor = asyncHandler( async (req , res )=>{
    const author = await Author.findById({_id : req.params.id});
    if(author) return  res.status(200).json(author);
    res.status(400).json({message : 'no authors'});
  })
    
  /**
 *  @desc    Create new author
 *  @route   /api/authors/:id
 *  @method  POST
 *  @access  private (only admin)
 */
  const createAuthor = asyncHandler( async (req , res )=>{
    let author = await Author.findById(req.params.id);
    console.log(author);
    if(!author) {return res.status(400).json({message : 'authors already exist' });}

    const {error} = validateCreateAuthor(req.body);
    if(error) {return res.status(400).json({message : error.details[0].message});}
     author = new Author({
      firstName : req.body.firstName,
      lastName : req.body.lastName, 
      nationality : req.body.nationality
    });
    await author.save();
    res.status(201).json(author);
  })

  
  

/**
 *  @desc    update author
 *  @route   /api/authors/:id
 *  @method  Put
 *  @access  private (only admin)
 */

const updateAuthor = asyncHandler( async (req , res )=>{
    let author = await Author.findById(req.params.id);
    console.log(author);
    if(!author) {return res.status(400).json({message : 'authors not exist' });}
  
    const {error} = validateUpdateAuthor(req.body);
    if(error) {return res.status(400).json({message : error.details[0].message});}
     author = new Author({
      firstName : req.body.firstName,
      lastName : req.body.lastName, 
      nationality : req.body.nationality
    });
   const result = await author.save();
    res.status(201).json(result);
  })

  

  

/**
 *  @desc    delete author
 *  @route   /api/authors/:id
 *  @method  DELETE
 *  @access  private (only admin) 
 */

const deleteAuthor = asyncHandler( async (req , res )=>{
    let author = await Author.findById(req.params.id);
    if(!author) {return res.status(400).json({message : 'authors not exist' });}
  
    author.deleteOne({ _id : req.params.id});
    await author.save();
    res.status(201).json({message : 'author deleted'});
  })

  


module.exports = {getAuthors , getAuthor , createAuthor , updateAuthor , deleteAuthor}; ;



































// const express = require("express");
// const { register, login } = require("../controllers/authController");
// const router = express.Router();


// // /api/authors/register
// router.post("/register", register);

// // /api/authors/login
// router.post("/login", login);

// module.exports = router;
































//-----------------------------------------------------------------------------//
// const express = require("express");
// const router = express.Router();
// const {
//   getAllAuthors,
//   getAuthorById,
//   createAuthor,
//   updateAuthor,
//   deleteAuthor,
// } = require("../controllers/authorController");
// const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

// // /api/authors
// router.route("/").get(getAllAuthors).post(verifyTokenAndAdmin, createAuthor);
// // verifyTokenAndAdmin to protect
// // /api/authors/:id
// router
//   .route("/:id")
//   .get(getAuthorById)
//   .put(verifyTokenAndAdmin, updateAuthor)
//   .delete(verifyTokenAndAdmin, deleteAuthor);

// module.exports = router;






















//-----------------------------------------------------------------------------//


// const asyncHandler = require("express-async-handler");
// const {
//   Author,
//   validateCreateAuthor,
//   validateUpdateAuthor,
// } = require("../models/Author");

// /**
//  *  @desc    Get all authors
//  *  @route   /api/authors
//  *  @method  GET
//  *  @access  public
//  */
// module.exports.getAllAuthors = asyncHandler(async (req, res) => {
//   const { pageNumber } = req.query;
//   const authorsPerPage = 2;

//   const authorList = await Author.find()
//     .skip((pageNumber - 1) * authorsPerPage)
//     .limit(authorsPerPage);

//   res.status(200).json(authorList);
// });

// /**
//  *  @desc    Get author by id
//  *  @route   /api/authors/:id
//  *  @method  GET
//  *  @access  public
//  */
// module.exports.getAuthorById = asyncHandler(async (req, res) => {
//   const author = await Author.findById(req.params.id);
//   if (author) {
//     res.status(200).json(author);
//   } else {
//     res.status(404).json({ message: "author not found" });
//   }
// });

// /**
//  *  @desc    Create new author
//  *  @route   /api/authors
//  *  @method  POST
//  *  @access  private (only admin)
//  */
// module.exports.createAuthor = asyncHandler(async (req, res) => {
//   const { error } = validateCreateAuthor(req.body);

//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }

//   const author = new Author({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     nationality: req.body.nationality,
//     image: req.body.image,
//   });

//   const result = await author.save();
//   res.status(201).json(result);
// });

// /**
//  *  @desc    Update an author
//  *  @route   /api/authors/:id
//  *  @method  PUT
//  *  @access  private (only admin)
//  */
// module.exports.updateAuthor = asyncHandler(async (req, res) => {
//   const { error } = validateUpdateAuthor(req.body);

//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }

//   const author = await Author.findByIdAndUpdate(
//     req.params.id,
//     {
//       $set: {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         nationality: req.body.nationality,
//         image: req.body.image,
//       },
//     },
//     { new: true }
//   );

//   res.status(200).json(author);
// });

// /**
//  *  @desc    Delete an author
//  *  @route   /api/authors/:id
//  *  @method  DELETE
//  *  @access  private (only admin)
//  */
// module.exports.deleteAuthor = asyncHandler(async (req, res) => {
//   const author = await Author.findById(req.params.id);
//   if (author) {
//     await Author.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "author has been deleted" });
//   } else {
//     res.status(404).json({ message: "author not found" });
//   }
// });
