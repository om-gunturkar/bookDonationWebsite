const Request = require("../models/Request");

exports.createRequest = async (req, res) => {
  const request = await Request.create({
    ...req.body,
    requesterId: req.user.userId
  });
  res.status(201).json(request);
};

exports.getUserRequests = async (req, res) => {
  const requests = await Request.find({ requesterId: req.user.userId }).populate("bookId");
  res.json(requests);
};
