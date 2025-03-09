const express = require("express"); // install to to handlle routing  
const router = express.Router(); // initiale express to deal router 

const {verifyToken , verifyTokenAndAdmin , verifyTokenAndAuthorization} = require('../middlewares/verifyToken') ;
const { getUsers , getUserById , updateUser , deleteUser } = require('../controller/userController') ;


router.get('/' , verifyTokenAndAdmin , getUsers) ;
router.get('/:id' ,verifyTokenAndAuthorization,getUserById ) ;
router.put('/:id' ,verifyTokenAndAuthorization,updateUser);
router.delete('/:id' ,verifyTokenAndAuthorization,deleteUser) ;


  
  

module.exports = router ;



































// const express = require("express");
// const { register, login } = require("../controllers/authController");
// const router = express.Router();


// // /api/users/register
// router.post("/register", register);

// // /api/users/login
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

// // /api/users
// router.route("/").get(getAllAuthors).post(verifyTokenAndAdmin, createAuthor);
// // verifyTokenAndAdmin to protect
// // /api/users/:id
// router
//   .route("/:id")
//   .get(getAuthorById)
//   .put(verifyTokenAndAdmin, updateAuthor)
//   .delete(verifyTokenAndAdmin, deleteAuthor);

// module.exports = router;





























// const express = require("express");
// const {
//   getForgotPasswordView,
//   sendForgotPasswordLink,
//   getResetPasswordView,
//   resetThePassword,
// } = require("../controllers/passwordController");
// const router = express.Router();

// // /users/forgot-users
// router
//   .route("/forgot-users")
//   .get(getForgotPasswordView)
//   .post(sendForgotPasswordLink);


// // /users/reset-users/:userId/:token
// router.route("/reset-users/:userId/:token")
//   .get(getResetPasswordView)
//   .post(resetThePassword)

// module.exports = router;


















// const express = require("express");
// const {
//   updateUser,
//   getAllUsers,
//   getUserById,
//   deleteUser,
// } = require("../controllers/userController");
// const router = express.Router();
// const {
//   verifyTokenAndAuthorization,
//   verifyTokenAndAdmin,
// } = require("../middlewares/verifyToken");

// // /api/users
// router.get("/", verifyTokenAndAdmin, getAllUsers);

// // /api/users/:id
// router
//   .route("/:id")
//   .put(verifyTokenAndAuthorization, updateUser)
//   .get(verifyTokenAndAuthorization, getUserById)
//   .delete(verifyTokenAndAuthorization, deleteUser);

// module.exports = router;
