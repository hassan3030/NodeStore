// middleware to display url as => GET http://localhost:5000/api/books

const logger = (req, res, next) => {
    console.log(
      `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
    );
    next(); // without it not skip to the next function (middleware)
  };
  
  module.exports = logger;
  