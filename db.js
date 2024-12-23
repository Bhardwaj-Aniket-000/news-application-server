const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;
const MONGO_LOCAL_URL = process.env.MONGO_LOCAL_URL;
mongoose.connect(MONGO_LOCAL_URL);
const db = mongoose.connection;

db.on("connected", () => {
  console.log("Database Connect Successfully");
});
db.on("disconnected", () => {
  console.log("Database is disConnected");
});
db.on("error", () => {
  console.log("Error fetched Successfully");
});

module.exports = db;
