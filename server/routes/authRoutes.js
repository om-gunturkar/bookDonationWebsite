// routes/authRoutes.js
// This file defines the API routes specifically for user authentication.
// It maps HTTP methods (like POST) to corresponding controller functions.

const express = require("express"); // Import the Express framework to create a router
const router = express.Router(); // Create a new router instance from Express
const { signup, login } = require("../controllers/authController"); // Import signup and login functions from the auth controller

// Define a POST route for user registration (signup).
// When a POST request is made to /api/auth/signup, the 'signup' function will be executed.
router.post("/signup", signup);

// Define a POST route for user login.
// When a POST request is made to /api/auth/login, the 'login' function will be executed.
router.post("/login", login);

// Export the router so it can be used by the main Express application (e.g., in server.js).
module.exports = router;
