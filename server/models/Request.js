// models/Request.js
// Defines the Mongoose schema for the Request model.
// This schema outlines the structure for book request documents, tracking who requested which book and the request's status.

const mongoose = require("mongoose"); // Import Mongoose for defining schemas and interacting with MongoDB

// Define the schema for the Request model
const requestSchema = new mongoose.Schema({
  // bookId: References the specific book that is being requested.
  // This is a link to a document in the 'Book' collection.
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },

  // requesterId: References the user who made this request.
  // This is a link to a document in the 'User' collection.
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // status: Tracks the current state of the book request.
  // Default value is 'pending'. Other possible values could be 'approved' or 'picked'.
  status: { type: String, default: "pending" }, // Possible values: 'pending', 'approved', 'picked'
});

// Export the Mongoose model for the 'Request' collection.
// This model will be used to perform database operations on book requests.
module.exports = mongoose.model("Request", requestSchema);
