// registeration 
// is login from before

const express = require("express"); // install to to handlle routing  
const router = express.Router(); // initiale express to deal router 
const { register, login } = require("../controller/authController"); // import register and login from authController

// http methods / verbs / rout handler

router.post('/register' , register) // handle post request to register
router.post('/login' , login) // handle post request to login





module.exports = router ;



































// const express = require("express");
// const { register, login } = require("../controllers/authController");
// const router = express.Router();


// // /api/auth/register
// router.post("/register", register);

// // /api/auth/login
// router.post("/login", login);

// module.exports = router;
