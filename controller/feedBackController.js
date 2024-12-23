const { response } = require("express");
const { GenerateToken } = require("../middleware/jwt");
const userFeedBack = require("../models/feedback");
const userData = require("../models/userInfo");
const bcrypt = require("bcrypt");

const getIndex = async (req, res, next) => {
  try {
    const allFeedBacks = await userFeedBack.find({});
    if (!allFeedBacks.length) {
      res.json([]);
      return;
    }
    res.json(allFeedBacks);
  } catch (error) {
    res.json(error);
  }
};

const getFeedback = (req, res) => {
  const tokenUser = req.user;
  res.json(tokenUser);
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({ missing: "missing email or passsowrd" });
      return;
    }
    const findUser = await userData.find({ email });
    if (findUser.length == 0) {
      res.json({ error: "User Not Found , This Email is not Registered !" });
      return;
    }
    const matchedPassword = await findUser[0].comparePassword(password);
    if (!matchedPassword) {
      res.json({ error: "Enter a valid Password , try again !" });
      return;
    }
    const payload = {
      email,
      username: findUser[0].username,
      id: findUser[0]._id,
    };
    const token = GenerateToken(payload);
    res.json({ token, findUser, success: true, unique: payload.id });
  } catch (error) {
    res.json({ error: "server error , try again !" });
  }
};

const sendFeedback = async (req, res, next) => {
  try {
    const tokenUser = req.user;
    const { typeFeedback, content } = req.body;
    const response = await userFeedBack({
      typeFeedback,
      content,
      email: tokenUser.email,
      userAccess: tokenUser.id,
      time: new Date().toLocaleString(),
    });
    if (!response) {
      res.json({ error: "feedback not shared , try again ." });
      return;
    }
    await response.save();
    res.json({ response, success: true });
  } catch (error) {
    res.json({ error: "Server Error , feedback not shared ." });
  }
};

const userSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.json({ missing: "missing something else , fill above fields" });
      return;
    }
    const userExist = await userData.find({ email });
    if (!userExist.length == 0) {
      res.json({ error: "Email Already exist , try another one !" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const response = await userData({
      username,
      email,
      password: hashedPassword,
    });
    await response.save();
    const payload = {
      email,
      username,
      id: response._id,
    };
    const token = GenerateToken(payload);
    res.json({ token, success: true, response });
  } catch (error) {
    res.json({ error: "Some error Occurred during signup,try later" });
  }
};

const feedbackDelete = async (req, res, next) => {
  try {
    const removeAbleID = req.body.id;
    const response = await userFeedBack.findByIdAndDelete(removeAbleID);

    if (response) {
      res.json({ req: response, success: true });
      return;
    }
    res.json({ error: "feedback not deleted , try again later" });
  } catch (error) {
    res.json({ error: "feedback not deleted , try again later" });
  }
};

const feedbackUpdate = async (req, res, next) => {
  try {
    const { content, typeFeedback, id } = req.body;
    const response = await userFeedBack.findByIdAndUpdate(
      { _id: id },
      { content, typeFeedback, time: new Date().toLocaleString() },
      { new: true, runValidators: true }
    );
    if (response) {
      res.json({ response, success: true });
      return;
    }
    res.json({ error: "feedback not updated yet" });
  } catch (error) {
    res.json({ error: "feedback not updated yet" });
  }
};

const accountDelete = async (req, res, next) => {
  try {
    const userToken = req.user;
    // console.log(userToken);
    const response = await userData.findByIdAndDelete(userToken.id);
    const userFeedDelete = await userFeedBack.deleteMany({
      userAccess: response.id,
    });
    const userFeed = await userFeedBack.find({});
    if (!response) {
      res.json({
        error: "Account not Deleted , some server issue occured try later .",
      });
      return;
    }
    res.json({ response, success: true, userFeed });
  } catch (error) {
    res.json({
      error: "Account not Deleted , some server issue occured try later .",
    });
  }
};
module.exports = {
  userLogin,
  getIndex,
  sendFeedback,
  userSignup,
  feedbackDelete,
  getFeedback,
  feedbackUpdate,
  accountDelete,
};
