const jwt = require("jsonwebtoken");

// Middleware for token authentication
exports.authenticateToken = (req, res, next) => {

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // if there isn't any token

  // Token Verification
  jwt.verify(token, "secretKey", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); 
  });
};
