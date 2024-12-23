const express = require("express");
const router = express.Router();
const { VerifyToken } = require("../middleware/jwt");
const {
  userLogin,
  getIndex,
  sendFeedback,
  userSignup,
  feedbackDelete,
  getFeedback,
  feedbackUpdate,
  accountDelete,
} = require("../controller/feedBackController");

router.route("/").get(getIndex);
router.route("/api/v3/getFeedback").get(VerifyToken, getFeedback);
router.route("/api/v3/login").post(userLogin);
router.route("/api/v3/sendFeedback").post(VerifyToken, sendFeedback);
router.route("/api/v3/signup").post(userSignup);
router.route("/api/v3/deletefeedback").delete(VerifyToken, feedbackDelete);
router.route("/api/v3/updatefeedback").put(VerifyToken, feedbackUpdate);
router.route("/api/v3/clearAcount").delete(VerifyToken, accountDelete);

module.exports = router;
