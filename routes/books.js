
const express = require("express"); // install to to handle routing  
const router = express.Router(); // initial express to deal router 
const {verifyToken , verifyTokenAndAdmin , verifyTokenAndAuthorization} = require('../middlewares/verifyToken'); // handle token
const {getAllBooks , getBookByAuthor , createBook , updateBook , deleteBook} = require("../controller/bookController")

// http methods / verbs / rout handler
router.get('/' , getAllBooks)
router.get('/:author' ,  getBookByAuthor)
router.post('/' , verifyTokenAndAdmin ,createBook )
router.put('/:title' , verifyTokenAndAdmin , updateBook)
router.delete('/:title' , verifyTokenAndAdmin , deleteBook)




  


  

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

module.exports = router;
