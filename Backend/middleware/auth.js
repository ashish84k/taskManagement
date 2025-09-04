const jwt = require("jsonwebtoken");
const Users = require("../models/User");

function authenticate(allowedRoles = []) {
  return async (req, res, next) => {
    const token = req.signedCookies?.accessToken;
  
    
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);

      if (!decoded) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      const newUser = await Users.findOne({ where: { email: decoded.email } });
      if (!newUser)
        return res.status(401).json({ message: "Unauthorized access" });

      if (allowedRoles.length && !allowedRoles.includes(newUser.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      
      req.user = decoded;
      next();
    } catch (err) {
      console.error("JWT verification error:", err);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
}

function recreateToken(req , res , next) {
      next();
}

module.exports = { authenticate, recreateToken };
