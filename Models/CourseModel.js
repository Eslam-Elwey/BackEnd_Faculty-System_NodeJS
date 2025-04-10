const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    _id: Number,
    name: String,
    deg: Number,
  },
  { collection: "Courses" }
);

const CourseModel = mongoose.model("Courses", courseSchema);

module.exports = CourseModel;
