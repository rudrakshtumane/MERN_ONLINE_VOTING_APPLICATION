const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  let token = req.header("Authorization");

  // Check if the Authorization header exists
  if (!token) {
    return res.status(401).send({ msg: "No token, authorization denied" });
  }

  // Split the token and ensure it's in the correct Bearer format
  try {
    const tokenParts = token.split(" ");

    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res
        .status(400)
        .send({ msg: "Invalid token format. Use 'Bearer <token>'" });
    }

    token = tokenParts[1]; // Get the actual token part

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded payload contains user information
    if (!decoded.user || !decoded.user.role) {
      return res
        .status(401)
        .send({ msg: "Token is missing user data or role" });
    }

    // Attach the user object to the request
    req.user = decoded.user;

    next();
  } catch (err) {
    return res.status(401).send({ msg: "Token is not valid or has expired" });
  }
};

exports.admin = (req, res, next) => {
  let token = req.header("Authorization");

  // Ensure the Authorization header exists
  if (!token) {
    return res.status(401).send({ msg: "No token, authorization denied" });
  }

  // Ensure the token follows the Bearer format
  try {
    const tokenParts = token.split(" ");
    
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(400).send({ msg: "Invalid token format" });
    }

    token = tokenParts[1]; // Get the actual token part

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    // Check for admin role
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).send({ msg: "Access denied, admin only" });
    }

    next();
  } catch (err) {
    return res.status(401).send({ msg: "Unauthorized, invalid token" });
  }
};
