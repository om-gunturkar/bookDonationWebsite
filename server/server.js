// server.js
// This is the main entry point for your Express.js backend application.
// It sets up the server, connects to the database, and defines the main API routes.

const express = require("express"); // Import the Express framework to build the web application
const mongoose = require("mongoose"); // Import Mongoose for connecting to MongoDB and interacting with the database
const dotenv = require("dotenv"); // Import dotenv to load environment variables from a .env file
const cors = require("cors"); // Import cors middleware to enable Cross-Origin Resource Sharing

// Import route modules
const authRoutes = require("./routes/authRoutes"); // Routes for user authentication (signup, login)
const bookRoutes = require("./routes/bookRoutes"); // Routes for managing books (add, get, delete)
const requestRoutes = require("./routes/requestRoutes"); // Routes for managing book requests (create, get user requests)

dotenv.config(); // Load environment variables from the .env file into process.env

const app = express(); // Initialize the Express application

app.use(cors()); // Enable CORS for all routes, allowing requests from different origins (e.g., your React frontend)
app.use(express.json()); // Middleware to parse incoming JSON payloads in request bodies

// --- API Routes ---
// Mount the imported route modules to specific base paths.
// All authentication-related routes will start with /api/auth
app.use("/api/auth", authRoutes);
// All book-related routes will start with /api/books
app.use("/api/books", bookRoutes);
// All request-related routes will start with /api/requests
app.use("/api/requests", requestRoutes);

// --- Database Connection and Server Start ---
// Connect to MongoDB using the connection string from environment variables.
// The .then() block executes if the connection is successful.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // If database connection is successful, start the Express server.
    // The server listens on the port specified in process.env.PORT or defaults to 5000.
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port", process.env.PORT || 5000);
    });
  })
  .catch((err) => {
    // If there's an error connecting to the database, log the error to the console.
    console.error("MongoDB connection error:", err);
  });
