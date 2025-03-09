const express = require('express'); // install to to handle routing and middleware 
// const booksPath = require('./routes/books'); // get router books API
// const authPath = require('./routes/auth'); // get router auth API
// const authorsPath = require('./routes/authors'); // get router authors API
// const passwordPath = require('./routes/password'); // get router password API
// const usersPath = require('./routes/users'); // get router users API
const logger = require('./middlewares/logger') 
const {notFound , errorHandler} = require('./middlewares/error') 
const asyncHandler = require('express-async-handler'); // handle router by default

require("dotenv").config(); // install to to handle .env file  
const connectToDB = require('./config/db'); // connected to mongoDB 

connectToDB(); // use connection to mongoDB 
const app = express() // initial express 

// apply middleware -- must be in app file 
// applying order is very important 
app.use(express.json())  // middleware to deal with json and accepted take from req then send 
app.use(express.urlencoded({extended: false})); // middleware to deal with html form data 

app.use(logger) 

// Set View Engine must be the shapes
app.set('view engine', 'ejs');  //  'ejs' => as bug if you use it




// routes
app.use('/api/books/' , require('./routes/books')); // handle router books
app.use('/api/auth/' , require('./routes/auth')); // handle router register
app.use('/api/auth/' , require('./routes/auth')); // handle router login
app.use('/api/authors/' , require('./routes/authors')); // handle router authors
app.use('/api/users/' , require('./routes/users')); // handle router
app.use('/password' , require('./routes/password')); // handle router password

// apply middleware notFound
app.use(notFound) 
// apply middleware errorHandler
app.use(errorHandler) 



// running server 
const PORT = process.env.PORT || 8000;
app.listen(PORT , ()=>{console.log(`server is running mode: ${process.env.NODE_ENV}on port: ${PORT} `)})

