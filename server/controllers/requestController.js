// requestController.js
// This file contains the controller logic for managing book request operations,
// including creating a new request and retrieving requests made by a specific user.

// Import necessary modules
const Request = require("../models/Request"); // Import the Request Mongoose model to interact with the requests collection in MongoDB

exports.createRequest = async (req, res) => {
  try {
    // Create a new request document in the database.
    // {...req.body} spreads all properties from the request body (e.g., bookId, message).
    // requesterId: req.user.userId assigns the ID of the authenticated user as the requester.
    // This `req.user.userId` assumes that an authentication middleware has successfully
    // verified a JWT and attached the user's ID to the request object.
    const request = await Request.create({
      ...req.body,
      requesterId: req.user.userId,
    });

    // Send a success response with status 201 (Created) and the newly created request object.
    res.status(201).json(request);
  } catch (err) {
    // If an error occurs during the request creation,
    // send a 400 (Bad Request) status with an error message.
    console.error(err); // Log the error for debugging
    res
      .status(400)
      .json({ error: "Failed to create request", message: err.message });
  }
};

exports.getUserRequests = async (req, res) => {
  try {
    // Find all request documents where the 'requesterId' matches the authenticated user's ID.
    // .populate("bookId") is used to replace the 'bookId' field with the actual book
    // document from the 'Book' collection. This makes the response more informative.
    const requests = await Request.find({
      requesterId: req.user.userId,
    }).populate("bookId");

    // Send a success response with the retrieved list of requests.
    res.json(requests);
  } catch (err) {
    // If an error occurs during the retrieval of requests,
    // send a 500 (Internal Server Error) status with an error message.
    console.error(err); // Log the error for debugging
    res
      .status(500)
      .json({ error: "Failed to fetch user requests", message: err.message });
  }
};
