const Book = require("../models/Book");

exports.getAllBooks = async (req, res) => {
  const books = await Book.find().populate("donatedBy", "name email");
  res.json(books);
};

exports.addBook = async (req, res) => {
  const book = await Book.create({ ...req.body, donatedBy: req.user.userId });
  res.status(201).json(book);
};

exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
};
