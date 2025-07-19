// bookController.js
// This file contains the controller logic for managing book-related operations,
// including retrieving all books, adding a new book, and deleting a book.

// Import necessary modules
const Book = require("../models/Book"); // Import the Book Mongoose model to interact with the books collection in MongoDB

exports.getAllBooks = async (req, res) => {
  try {
    // Find all book documents in the database.
    // .populate("donatedBy", "name email") is used to replace the 'donatedBy' (user ID) field
    // with the actual user document from the 'User' collection, but only including
    // the 'name' and 'email' fields of that user. This makes the response more informative.
    const books = await Book.find().populate("donatedBy", "name email");

    // Send a success response with the retrieved list of books.
    res.json(books);
  } catch (err) {
    // If an error occurs during the retrieval of books,
    // send a 500 (Internal Server Error) status with an error message.
    console.error(err); // Log the error for debugging
    res
      .status(500)
      .json({ error: "Failed to fetch books", message: err.message });
  }
};

exports.addBook = async (req, res) => {
  try {
    // Create a new book document in the database.
    // {...req.body} spreads all properties from the request body (e.g., title, author, genre).
    // donatedBy: req.user.userId assigns the ID of the authenticated user as the donor.
    // This `req.user.userId` assumes that an authentication middleware has successfully
    // verified a JWT and attached the user's ID to the request object.
    const book = await Book.create({ ...req.body, donatedBy: req.user.userId });

    // Send a success response with status 201 (Created) and the newly created book object.
    res.status(201).json(book);
  } catch (err) {
    // If an error occurs during the book creation,
    // send a 400 (Bad Request) status with an error message.
    console.error(err); // Log the error for debugging
    res.status(400).json({ error: "Failed to add book", message: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    // Find a book by its ID and delete it from the database.
    // req.params.id gets the ID from the URL parameter.
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    // If no book was found with the given ID, send a 404 (Not Found) error.
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Send a success response with a confirmation message.
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    // If an error occurs during the deletion process,
    // send a 500 (Internal Server Error) status with an error message.
    console.error(err); // Log the error for debugging
    res
      .status(500)
      .json({ error: "Failed to delete book", message: err.message });
  }
};
