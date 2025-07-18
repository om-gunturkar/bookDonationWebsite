const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { createRequest, getUserRequests } = require("../controllers/requestController");

router.post("/", auth, createRequest);
router.get("/", auth, getUserRequests);

module.exports = router;
