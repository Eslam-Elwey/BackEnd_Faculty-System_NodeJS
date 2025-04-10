const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    _id: Number,
    name: String,
    dept: String,
  },
  { collection: "Students" }
);

const StudentModel = mongoose.model("Studnets", studentSchema);

module.exports = StudentModel;
