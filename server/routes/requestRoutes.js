// routes/requestRoutes.js
// This file defines the API routes specifically for managing book requests.
// It maps HTTP methods (like POST, GET) to corresponding controller functions.

const express = require("express"); // Import the Express framework to create a router
const router = express.Router(); // Create a new router instance from Express
const auth = require("../middleware/authMiddleware"); // Import the authentication middleware for protected routes
const {
  createRequest,
  getUserRequests,
} = require("../controllers/requestController"); // Import request management functions from the request controller

// Define a POST route to create a new book request.
// This route is protected by the 'auth' middleware, meaning only authenticated users can create requests.
router.post("/", auth, createRequest);

// Define a GET route to retrieve all requests made by the authenticated user.
// This route is also protected by the 'auth' middleware, ensuring users can only see their own requests.
router.get("/", auth, getUserRequests);

// Export the router so it can be used by the main Express application (e.g., in server.js).
module.exports = router;
