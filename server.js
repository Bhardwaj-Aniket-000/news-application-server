const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
require("./db");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

app.use(cookieParser());
app.use(
  cors({
    origin: "https://globalheadlines.netlify.app/",
    methods: ["get", "post", "delete", "put"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const userFeedBack = require("./models/feedback");
// const userData = require("./models/userInfo");
const feedbackRoutes = require("./routes/FeedbacksRoutes");

// app.use(express.static("dist"))
// const path = require("path")
// app.get("/", (req, res) => {
// 	res.sendFile(path.join(__dirname+"/dist/index.html"));
// });

app.use(feedbackRoutes);

app.listen(port, () => {
  console.log(`server is started at http://localhost:${port}`);
});
