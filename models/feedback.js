const mongoose = require("mongoose");

const feedBackSchema = new mongoose.Schema({
  // username: {
  // 	type: String,
  // 	required: true,
  // },
  // email: {
  // 	type: String,
  // 	required: true,
  // },
  typeFeedback: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userAccess: {
    type: mongoose.Schema.ObjectId,
    ref: "userData",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
});
const userFeedBack = mongoose.model("userFeedBack", feedBackSchema);
module.exports = userFeedBack;
