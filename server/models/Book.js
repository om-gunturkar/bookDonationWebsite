// models/Book.js
// Defines the Mongoose schema for the Book model, outlining the structure for book documents.

const mongoose = require("mongoose"); // Import Mongoose for schema definition and MongoDB interaction

// Define the schema for the Book model
const bookSchema = new mongoose.Schema({
  title: String, // Title of the book
  author: String, // Author of the book
  subject: String, // Subject or genre of the book
  condition: String, // Physical condition of the book (e.g., 'New', 'Good')
  isAvailable: { type: Boolean, default: true }, // Availability status of the book
  donatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User who donated the book
});

// Export the Mongoose model for the 'Book' collection
module.exports = mongoose.model("Book", bookSchema);
