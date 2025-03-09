
const {User,validateChangePassword , validateLoginUser,validateRegisterUser,validateUpdateUser} = require('../models/User')
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs'); 








// http methods / verbs / rout handeller


/**
 *  @desc    Get all users
 *  @route   /api/users
 *  @method  GET
 *  @access  private (only admin)
 */
const getUsers = asyncHandler( async(req , res )=>{

    const users = await User.find();
    res.status(200).json(users);
    }
    )

  /**
 *  @desc    Get user by id 
 *  @route   /api/users/:id
 *  @method  GET
 *  @access  private (only admin & user himself)
 */
const getUserById = asyncHandler( async(req , res )=>{
    const user  = await User.findById(req.params.id).select("-password");
    if(!user) return res.status(400).json({message : 'user not found'});
    res.status(200).json(user);

    }
    ) 


/**
 *  @desc    Put all users
 *  @route   /api/users
 *  @method  Put
 *  @access  private
 */
const updateUser = asyncHandler( async(req , res )=>{
  const {error} = validateUpdateUser(req.body);
  if(error)  return res.status(400).send(error.details[0].message);

  let updatedUser = await User.findById(req.params.id);
  if(!updatedUser) return res.status(400).json({message : 'Invalid user'});
    const salt = bcrypt.genSaltSync(10); // # of hashing add to pass
      req.body.password = bcrypt.hashSync(req.body.password, salt); // encryption to pass + hash 
  updatedUser = await User.findByIdAndUpdate(req.params.id ,
     { $set:{email : req.body.email ,
      username: req.body.username ,
      password : req.body.password }} , 
      {new : true}).select("-password");
  res.status(200).json(updatedUser);
  }
  )
  
  /**
 *  @desc    Delete user by id 
 *  @route   /api/users/:id
 *  @method  DELETE
 *  @access  private (only admin & user himself)
 */

const deleteUser = asyncHandler( async(req , res )=>{
    const user  = await User.findById(req.params.id).select("-password");
    if(!user) return res.status(400).json({message : 'user not found'});
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({message : 'user deleted'});
    }
)
  

module.exports = { getUsers , getUserById , updateUser , deleteUser } 



































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















// const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcryptjs");
// const { User, validateUpdateUser } = require("../models/User");

// /**
//  *  @desc    Update User
//  *  @route   /api/users/:id
//  *  @method  PUT
//  *  @access  private (only admin & user himself)
//  */
// module.exports.updateUser = asyncHandler(async (req, res) => {
//   const { error } = validateUpdateUser(req.body);
//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }

//   if (req.body.password) {
//     const salt = await bcrypt.genSalt(10);
//     req.body.password = await bcrypt.hash(req.body.password, salt);
//   }

//   const updatedUser = await User.findByIdAndUpdate(
//     req.params.id,
//     {
//       $set: {
//         email: req.body.email,
//         password: req.body.password,
//         username: req.body.username,
//       },
//     },
//     { new: true }
//   ).select("-password");

//   res.status(200).json(updatedUser);
// });

// /**
//  *  @desc    Get All Users
//  *  @route   /api/users
//  *  @method  GET
//  *  @access  private (only admin)
//  */
// module.exports.getAllUsers = asyncHandler(async (req, res) => {
//   const users = await User.find().select("-password");
//   res.status(200).json(users);
// });

// /**
//  *  @desc    Get User By Id
//  *  @route   /api/users/:id
//  *  @method  GET
//  *  @access  private (only admin & user himself)
//  */
// module.exports.getUserById = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id).select("-password");
//   if (user) {
//     res.status(200).json(user);
//   } else {
//     res.status(404).json({ message: "user not found" });
//   }
// });

// /**
//  *  @desc    Delete User
//  *  @route   /api/users/:id
//  *  @method  DELETE
//  *  @access  private (only admin & user himself)
//  */
// module.exports.deleteUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id).select("-password");
//   if (user) {
//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "user has been deleted successfully" });
//   } else {
//     res.status(404).json({ message: "user not found" });
//   }
// });
