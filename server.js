// #region Requires
const express = require("express");
const app = express();
const PORT = process.env.PORT || 6300;
const mongoose = require("mongoose");

const StudentRoutes = require("./Routes/StudentRoutes");
const CourseRoutes = require("./Routes/CourseRoutes");

const bodyParser = require("body-parser");
const path = require("path");

//#endregion

// #region COnnect To Data Base
mongoose
  .connect("mongodb://localhost:27017/Faculty")
  .then((_) => console.log("Data Base Faculty Connected"));
//#endregion

// #region MiddleWare
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//#endregion

// #region Students API

app.use("/api/students", StudentRoutes);

//#endregion

// #region Courses API

app.use("/api/courses", CourseRoutes);

//#endregion

// #region Handle Requests
app.get("/", (req, res) => {
  res.send("<h1>Hello Node Day5</h1>");
});
//#endregion

app.listen(PORT, function () {
  console.log("Listenning to http://localhost:" + PORT);
});
