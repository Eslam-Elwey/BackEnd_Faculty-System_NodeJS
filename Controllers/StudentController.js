const Ajv = require("ajv");

const ajv = new Ajv();

const studentValidate = require("../Utils/StudentValidation");

const Student = require("../Models/StudentModel");

// #region allStudents
let stdID = 0;
//#endregion

// #region Database
//#endregion

(async function () {
  let allStudents = await Student.find();
  //get all Collection Length
  stdID = Number(allStudents[allStudents.length - 1]?._id ?? 0);
})();

const getAllStudents = async (req, res) => {
  let allStudents = await Student.find();
  res.status(200).json({ messgae: "All Students", data: allStudents });
};

const addStudentToStds = async (req, res) => {
  //get student Data from body
  //increment id for AG ID

  let newStudentData = req.body;

  //validate
  const valid = studentValidate(newStudentData);

  if (valid) {
    stdID++;
    newStudentData._id = stdID;
    console.log(newStudentData);

    //push new student to Data Base
    const student = new Student(newStudentData);
    await student.save();
    let allStudents = await Student.find();

    //send saved succesfully
    res.status(201).json({ message: "Added Successfully", data: allStudents });
  } else {
    console.log(studentValidate.errors);
    res.status(400).json({ message: studentValidate.errors[0] });
  }
};

const getStudentByID = async (req, res) => {
  //get id
  let searchId = +req.params.id;
  //find Student
  let allStudents = await Student.find();
  let foundStudent = allStudents.find((std) => std._id === searchId) || {};

  res.json({ data: foundStudent });
};

const updateStudentDataByID = async (req, res) => {
  //save id from params
  let searchId = +req.params.id;
  let updatedStudentData = req.body;
  //search in all students to find a student with this id
  let allStudents = await Student.find();
  let retIndex = allStudents.findIndex((std) => std._id == searchId);

  if (retIndex === -1) {
    res.json({ message: "Student Not found With This Id " + searchId });
  } else {
    const valid = studentValidate(updatedStudentData);
    if (valid) {
      updatedStudentData._id = searchId;
      console.log(updatedStudentData);
      let updateRet = await Student.findOneAndUpdate(
        { _id: updatedStudentData._id },
        {
          $set: {
            name: updatedStudentData.name,
            dept: updatedStudentData.dept,
          },
        }
      );
      let allStudents = await Student.find();
      res.json({
        message: "Updated Successfully",
        data: allStudents,
      });
    } else {
      res.json({ message: studentValidate.errors[0] });
    }
  }
};

const deleteStudentByID = async (req, res) => {
  //receive id
  let desiredID = +req.params.id;

  let allStudents = await Student.find();
  let foundVal = allStudents.findIndex((std) => std._id == desiredID);

  let deleteRes = await Student.findByIdAndDelete({ _id: desiredID });
  allStudents = await Student.find();
  if (foundVal != -1) {
    res.json({
      messgae: "deleted Successfully",
      data: allStudents,
    });
  } else {
    res.json({
      messgae: "No Student with this id to delete " + desiredID,
      data: allStudents,
    });
  }
};

module.exports = {
  getAllStudents,
  addStudentToStds,
  getStudentByID,
  updateStudentDataByID,
  deleteStudentByID,
};
