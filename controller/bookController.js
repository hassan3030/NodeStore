
const {Book,validateCreateBook , validateUpdateBook} = require('../models/Book');
const asyncHandler = require('express-async-handler'); // handle router by default
const mongoose = require('mongoose')

// http methods / verbs / rout handler

/**
 *  @desc    Get all books
 *  @route   /api/books
 *  @method  GET
 *  @access  public
 */

const getAllBooks = asyncHandler(
  async(req , res )=>{
    const {minPrice , maxPrice} = req.query
    if(minPrice && maxPrice){
      const books = await Book.find({price : { $gte : minPrice , $lte : maxPrice}}); 
      res.status(200).json(books)
    }
    else{
      const books = await Book.find();
      res.status(200).json(books)
    }
   })
 
  /**
 *  @desc    Get one books
 *  @route   /api/books/:id
 *  @method  GET
 *  @access  public
 */
const getBookByAuthor = asyncHandler(
    async(req , res )=>{
    
    const books = await Book.find({ author:req.params.author})
    console.log(books)
    if(books) return  res.status(200).json(books)
    res.status(404).json({message : "not found"})
   
  
   })
    
  /**
 *  @desc    Post one book
 *  @route   /api/books/:id
 *  @method  POST
 *  @access  private (admin)
 */
  const createBook = asyncHandler(
        async(req , res )=>{
         let book = await Book.findOne({title :  req.body.title})
          if(book) return res.status(400).json({message : "book already exist "});
          const {error} = validateCreateBook(req.body);
          if(error){
          return res.status(400).json({message : error.details[0].message});
        }

        const createBook = new Book({
          title : req.body.title ,  
          author : req.body.author,
          description : req.body.description,
          price : req.body.price,
          cover : req.body.cover
        })
        const books = await Book.insertOne(createBook)
        const result = books.save()
        res.status(200).json(result)
      
       })
  
  /**
 *  @desc    Update one book by id
 *  @route   /api/books/:id
 *  @method  PUT
 *  @access  private (admin)
 */
  const updateBook = asyncHandler(
    async(req , res )=>{

      let book = await Book.findOne({title :  req.params.title})
      if(book) return res.status(400).json({message : "book not founded "});
      const {error} = validateUpdateBook(req.body);
      if(error){
      return res.status(400).json({message : error.details[0].message});
    }
    book = await Book.updateOne({title :  req.params.title} , {
    $set : {
      title : req.body.title ,
      author : req.body.author,
      description : req.body.description,
      price : req.body.price,
      cover : req.body.cover
    }
    } , {new : true})

    const result = book.save()
    res.status(200).json(result)
  
   })

/**
 *  @desc    Delete book by title
 *  @route   /api/books/:title
 *  @method  DELETE
 *  @access  private (admin)
 */
const deleteBook = asyncHandler(
  async(req , res )=>{
    let book = await Book.findOne({title :  req.params.title})
    if(book) return res.status(400).json({message : "book not founded "});
    book = await Book.deleteOne({title :  req.params.title})
    const result = book.save()
  res.status(200).json("book deleted")
 })
  

//------------------------------------------------------------------------------// 

// router.route('/').get((req , res)=>{})


// const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
// const {
//   getAllBooks,
//   getBookById,
//   createBook,
//   updateBook,
//   deleteBook,
// } = require("../controllers/bookController");






// /api/books
// router.route("/").get(getAllBooks).post(verifyTokenAndAdmin, createBook);

// // /api/books/:id
// router
//   .route("/:id")
//   .get(getBookById)
//   .put(verifyTokenAndAdmin, updateBook)
//   .delete(verifyTokenAndAdmin, deleteBook);

module.exports = {getAllBooks , getBookByAuthor , createBook , updateBook , deleteBook};











// const asyncHandler = require("express-async-handler");
// const {
//   validateCreateBook,
//   validateUpdateBook,
//   Book,
// } = require("../models/Book");

// /**
//  *  @desc    Get all books
//  *  @route   /api/books
//  *  @method  GET
//  *  @access  public
//  */
// const getAllBooks = asyncHandler(async (req, res) => {
//   const { minPrice, maxPrice } = req.query;
//   let books;
//   if (minPrice && maxPrice) {
//     books = await Book.find({
//       price: { $gte: minPrice, $lte: maxPrice },
//     }).populate("author", ["_id", "firstName", "lastName"]);
//   } else {
//     books = await Book.find().populate("author", [
//       "_id",
//       "firstName",
//       "lastName",
//     ]);
//   }
//   res.status(200).json(books);
// });

// /**
//  *  @desc    Get book by id
//  *  @route   /api/books/:id
//  *  @method  GET
//  *  @access  public
//  */
// const getBookById = asyncHandler(async (req, res) => {
//   const book = await Book.findById(req.params.id).populate("author");
//   if (book) {
//     res.status(200).json(book);
//   } else {
//     res.status(404).json({ message: "book not found" });
//   }
// });

// /**
//  *  @desc    Create new book
//  *  @route   /api/books
//  *  @method  POST
//  *  @access  private (only admin)
//  */
// const createBook = asyncHandler(async (req, res) => {
//   const { error } = validateCreateBook(req.body);

//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }

//   const book = new Book({
//     title: req.body.title,
//     author: req.body.author,
//     description: req.body.description,
//     price: req.body.price,
//     cover: req.body.cover,
//   });

//   const result = await book.save();
//   res.status(201).json(result);
// });

// /**
//  *  @desc    Update a book
//  *  @route   /api/books/:id
//  *  @method  PUT
//  *  @access  private (only admin)
//  */
// const updateBook = asyncHandler(async (req, res) => {
//   const { error } = validateUpdateBook(req.body);

//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }

//   const updatedBook = await Book.findByIdAndUpdate(
//     req.params.id,
//     {
//       $set: {
//         title: req.body.title,
//         author: req.body.author,
//         description: req.body.description,
//         price: req.body.price,
//         cover: req.body.cover,
//       },
//     },
//     { new: true }
//   );

//   res.status(200).json(updatedBook);
// });

// /**
//  *  @desc    Delete a book
//  *  @route   /api/books/:id
//  *  @method  DELETE
//  *  @access  private (only admin)
//  */
// const deleteBook = asyncHandler(async (req, res) => {
//   const book = await Book.findById(req.params.id);
//   if (book) {
//     await Book.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "book has been deleted" });
//   } else {
//     res.status(404).json({ message: "book not found" });
//   }
// });


// module.exports = {
//   getAllBooks,
//   getBookById,
//   createBook,
//   updateBook,
//   deleteBook,
// };
