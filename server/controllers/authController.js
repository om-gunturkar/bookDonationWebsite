// authController.js
// This file contains the controller logic for user authentication,
// including signup (registration) and login functionalities.

const bcrypt = require("bcryptjs"); // Used for hashing and comparing passwords securely
const jwt = require("jsonwebtoken"); // Used for creating and verifying JSON Web Tokens (JWTs) for authentication
const User = require("../models/User"); // Import the User Mongoose model to interact with the users collection in MongoDB

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Destructure name, email, and password from the request body
    const hashed = await bcrypt.hash(password, 10);
    // Hash the plain-text password using bcrypt.
    // The '10' is the salt rounds, which determines the complexity of the hashing.
    const user = await User.create({ name, email, password: hashed });
    // Create a new user document in the database using the User model.
    // The password field stores the hashed password.
    res.status(201).json(user); // Send a success response with status 201 (Created) and the newly created user object.
  } catch (err) {
    res.status(400).json({ error: "Signup failed", message: err.message });
    // If an error occurs during the signup process (e.g., duplicate email),
    // send a 400 (Bad Request) status with an error message.
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }); // Find a user in the database by their email address

    if (!user) return res.status(400).json({ error: "User not found" }); // If no user is found with the provided email, send a 400 (Bad Request) error.

    const valid = await bcrypt.compare(password, user.password); // Compare the provided plain-text password with the hashed password stored in the database.
    // bcrypt.compare returns true if they match, false otherwise.
    if (!valid) return res.status(401).json({ error: "Invalid password" }); // If the passwords do not match, send a 401 (Unauthorized) error.

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    }); // If authentication is successful, create a JSON Web Token (JWT).
    // The token payload contains the user's ID.
    // process.env.JWT_SECRET is a secret key used to sign the token, making it secure.
    // expiresIn: "2d" sets the token to expire in 2 days.
    res.json({ token, user }); // Send a success response with the generated JWT token and the user object.
  } catch (err) {
    res.status(500).json({ error: "Login failed" }); // If any unexpected error occurs during the login process,
    // send a 500 (Internal Server Error) status.
  }
};
