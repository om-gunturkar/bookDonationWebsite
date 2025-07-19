// models/User.js
// Defines the Mongoose schema for the User model.
// This schema outlines the structure for user documents, including authentication details and roles.

const mongoose = require("mongoose"); // Import Mongoose for defining schemas and interacting with MongoDB

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  name: String, // User's full name
  email: { type: String, unique: true }, // User's email address, must be unique
  password: String, // User's hashed password
  role: { type: String, default: "user" }, // User's role, defaults to 'user', can be 'admin'
});

// Export the Mongoose model for the 'User' collection.
// This model will be used to perform database operations on user accounts.
module.exports = mongoose.model("User", userSchema);
