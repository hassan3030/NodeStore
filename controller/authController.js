// registeration 
// is login from before

const bcrypt = require('bcryptjs'); 
const asyncHandler = require('express-async-handler'); // handle router by defualt
const {User , validateLoginUser,validateRegisterUser} = require('../models/User')


// http methods / verbs / rout handler

/**
 *  @desc    Register new user 
 *  @route   /api/auth/register
 *  @method  POST
 *  @access  public
 */

const register =  asyncHandler(
    async (req,res)=>{
        const {error} = validateRegisterUser(req.body);
        if(error){
          return res.status(400).json({message:error.details[0].message});
        }
        let user = await User.findOne({email:req.body.email})
        if(user){
          return res.status(400).json({message:"this user already found"});
        }
        const salt = bcrypt.genSaltSync(10); // # of hashing add to pass
        req.body.password = bcrypt.hashSync(req.body.password, salt); // encryption to pass + hash 
        user =  new User({
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          isAdmin:req.body.isAdmin
        })
    
       const result =  await user.save();
       
       const token = user.generateToken();
       const {password , ...other} = result._doc; // destructure to result has the same shape (_doc)
      //  ...other =>> take your name contain all without the last keys
       res.status(201).json({other , token})
       }
)


  /**
 *  @desc    login new user  
 *  @route   /api/auth/login
 *  @method  POST
 *  @access  public
 */

  const login = asyncHandler(
    async (req,res)=>{
      const {error} = validateLoginUser(req.body);
      if(error){
        return res.status(400).json({message:error.details[0].message});
      }
      let user = await User.findOne({email:req.body.email})
      if(!user){
        return res.status(400).json({message :"user not founded"});
      }
      const isPasswordMatch = bcrypt.compareSync(req.body.password, user.password); // compare between 2 passwords first normal second is hashed
      if(isPasswordMatch){
        return   res.status(201).json({message: "it's login"});
      }
      res.status(400).json({message: "invalid email or password"});
     }
  )


module.exports = {register,login} ;


// const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcryptjs"); // installed pakage to encryption
// const {
//   User,
//   validateRegisterUser,
//   validateLoginUser,
// } = require("../models/User");

// /**
//  *  @desc    Register New User
//  *  @route   /api/auth/register
//  *  @method  POST
//  *  @access  public
//  */
// module.exports.register = asyncHandler(async (req, res) => {
//   const { error } = validateRegisterUser(req.body);
//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }

//   let user = await User.findOne({ email: req.body.email });
//   if (user) {
//     return res.status(400).json({ message: "this user already registered" });
//   }

//   const salt = await bcrypt.genSalt(10); // Generate a salt
//   req.body.password = await bcrypt.hash(req.body.password, salt); // Hash the password
//   // pass : 1111111
//   // Salt: $2b$10$JlfKTyYPAlbeVjsziro7C.
//   // Hashed Password: $2b$10$JlfKTyYPAlbeVjsziro7C.eUlR9sOKzpGxTpkq6wHtbkLWbwKuqW
  

//   user = new User({
//     email: req.body.email,
//     username: req.body.username,
//     password: req.body.password,
//   });
 
//   const result = await user.save();
//   const token = user.generateToken();
  
// // destructue to user ob
//   const { password, ...other } = result._doc; 
//   // ._doc convert resylt to ob 
//   //  { password, ...other } to prevent pass send

//   res.status(201).json({ ...other, token });
// });

// /**
//  *  @desc    Login User
//  *  @route   /api/auth/login
//  *  @method  POST
//  *  @access  public
//  */
// module.exports.login = asyncHandler(async (req, res) => {
//   const { error } = validateLoginUser(req.body);
//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }

//   let user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return res.status(400).json({ message: "invalid email or password" });
//   }

//   const isPasswordMatch = await bcrypt.compare(
//     req.body.password,
//     user.password
//   );

//   if (!isPasswordMatch) {
//     return res.status(400).json({ message: "invalid email or password" });
//   }
//   const token = user.generateToken();

//   const { password, ...other } = user._doc;

//   res.status(200).json({ ...other, token });
// });
