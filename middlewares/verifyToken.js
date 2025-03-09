const jwt = require("jsonwebtoken");


// --------------------------- to make protected routing ----------------------//

// Verify Token
function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded; // add user to req object
      
      next(); // go to the next middleware
    } catch (error) {
      res.status(401).json({ message: "invalid token" });
    }
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}

// Verify Token & Authorize the user
function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
       // 403 forbidden
      return res.status(403).json({ message: "you are not allowed" });
    }
  });
}

// Verify Token & Admin
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) { 
    
      next();
    } else {
      return res.status(403).json({ message: "you are not allowed,only admin allowed" });
    }
  });
}

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
};
