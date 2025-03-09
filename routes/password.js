
//-----------------------------------------------------------------------------//
const express = require("express");
const router = express.Router();
// const {
//   getAllAuthors,
//   getAuthorById,
//   createAuthor,
//   updateAuthor,
//   deleteAuthor,
// } = require("../controller/authorController");
const {getForgotPasswordView , sendForgotPasswordView , getResetPasswordView , resetThePassword} = require("../controller/passwordController");



// /api/password
// router.route("/forget-password").get(getForgotPasswordView)
router.get("/forget-password", getForgotPasswordView)
router.post("/forget-password", sendForgotPasswordView) // excute the function when press the button submit on html file
// /password/reset-password/:userId/:token

router.get("/reset-password/:userId/:token", getResetPasswordView) 
router.post("/reset-password/:userId/:token", resetThePassword) 



// verifyTokenAndAdmin to protect
// /api/password/:id

// const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

// // /api/password
// router.route("/forget-password").get(getAllAuthors).post(verifyTokenAndAdmin, createAuthor);
// // verifyTokenAndAdmin to protect
// // /api/password/:id

// // router
// //   .route("/:id")
// //   .get(getAuthorById)
// //   .put(verifyTokenAndAdmin, updateAuthor)
// //   .delete(verifyTokenAndAdmin, deleteAuthor);

module.exports = router;





























// const express = require("express");
// const {
//   getForgotPasswordView,
//   sendForgotPasswordLink,
//   getResetPasswordView,
//   resetThePassword,
// } = require("../controllers/passwordController");
// const router = express.Router();

// // /password/forgot-password
// router
//   .route("/forgot-password")
//   .get(getForgotPasswordView)
//   .post(sendForgotPasswordLink);


// // /password/reset-password/:userId/:token
// router.route("/reset-password/:userId/:token")
//   .get(getResetPasswordView)
//   .post(resetThePassword)

// module.exports = router;
