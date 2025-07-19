// authMiddleware.js
// This file contains middleware for authenticating requests using JSON Web Tokens (JWTs).
// It verifies the token sent in the request header and attaches the decoded user information to the request object.

// Import necessary modules
const jwt = require("jsonwebtoken"); // Used for verifying JSON Web Tokens (JWTs)

const authMiddleware = (req, res, next) => {
  // Get the Authorization header from the request.
  // This header typically looks like "Bearer <token>".
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is missing.
  // If no header is provided, send a 401 (Unauthorized) response.
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  // Extract the token part from the "Bearer <token>" string.
  // It splits the string by space and takes the second element (the token itself).
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the secret key stored in environment variables (process.env.JWT_SECRET).
    // If the token is valid, `jwt.verify` returns the decoded payload (which contains userId).
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token payload (which includes `userId`) to the request object.
    // This makes the user's ID available to subsequent route handlers and middleware.
    req.user = decoded;

    // Call the next middleware function in the stack.
    next();
  } catch (err) {
    // If token verification fails (e.g., token is expired, invalid signature),
    // send a 401 (Unauthorized) response with an "Invalid token" error.
    res.status(401).json({ error: "Invalid token" });
  }
};

// Export the middleware so it can be used in route definitions.
module.exports = authMiddleware;
