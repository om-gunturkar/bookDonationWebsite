const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getAllBooks, addBook, deleteBook } = require("../controllers/bookController");

router.get("/", getAllBooks);
router.post("/", auth, addBook);
router.delete("/:id", auth, deleteBook);

module.exports = router;
