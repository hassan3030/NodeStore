const express = require("express"); // install to to handle routing  
const router = express.Router(); // initial express to deal router 
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken"); // import verifyTokenAndAdmin from verifyToken.js
const {getAuthors , getAuthor , createAuthor , updateAuthor , deleteAuthor} = require('../controller/authorController');

// http methods / verbs / rout handler


router.get('/' , getAuthors)
router.get('/:id' , getAuthor)
router.post('/:id', verifyTokenAndAdmin , createAuthor)
router.put('/:id', verifyTokenAndAdmin , updateAuthor)
router.delete('/:id', verifyTokenAndAdmin , deleteAuthor)

  


module.exports = router ;



































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
