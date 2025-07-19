// routes/bookRoutes.js
// This file defines the API routes specifically for managing books.
// It maps HTTP methods (like GET, POST, DELETE) to corresponding controller functions.

const express = require("express"); // Import the Express framework to create a router
const router = express.Router(); // Create a new router instance from Express
const auth = require("../middleware/authMiddleware"); // Import the authentication middleware for protected routes
const {
  getAllBooks,
  addBook,
  deleteBook,
} = require("../controllers/bookController"); // Import book management functions from the book controller

// Define a GET route to retrieve all books.
// This route is public and does not require authentication.
router.get("/", getAllBooks);

// Define a POST route to add a new book.
// This route is protected by the 'auth' middleware, meaning only authenticated users can add books.
router.post("/", auth, addBook);

// Define a DELETE route to delete a book by its ID.
// The ':id' is a URL parameter for the book's ID.
// This route is also protected by the 'auth' middleware, requiring authentication for deletion.
router.delete("/:id", auth, deleteBook);

// Export the router so it can be used by the main Express application (e.g., in server.js).
module.exports = router;
