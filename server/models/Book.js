const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  subject: String,
  condition: String,
  isAvailable: { type: Boolean, default: true },
  donatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Book", bookSchema);
