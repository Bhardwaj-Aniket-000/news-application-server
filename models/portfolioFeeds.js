const mongoose = require("mongoose");

const portfoliofeedbacksSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
});
const portfoliofeedbacks = mongoose.model(
  "portfoliofeedbacks",
  portfoliofeedbacksSchema
);
module.exports = portfoliofeedbacks;
