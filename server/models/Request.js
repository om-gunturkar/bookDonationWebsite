const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "pending" } // 'pending', 'approved', 'picked'
});

module.exports = mongoose.model("Request", requestSchema);
