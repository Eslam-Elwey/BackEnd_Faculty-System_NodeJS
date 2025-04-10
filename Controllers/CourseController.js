const Ajv = require("ajv");

const ajv = new Ajv();

const courseValidate = require("../Utils/CourseValidation");

const Course = require("../Models/CourseModel");

// #region all Courses
let courseID = 0;
//#endregion

// #region DataBase
//#endregion

(async function () {
  let allCourses = await Course.find();
  //get all Collection Length
  courseID = Number(allCourses[allCourses.length - 1]?._id ?? 0);
})();

const getAllCourses = async (req, res) => {
  let allCourses = await Course.find();

  res.status(200).json({ messgae: "All Courses", data: allCourses });
};

const addCourseToCrs = async (req, res) => {
  //get Course Data from body
  //increment id for AG ID

  let newCourseData = req.body;

  const valid = courseValidate(newCourseData);

  console.log(newCourseData);

  if (valid) {
    courseID++;
    newCourseData._id = courseID;
    //push new course to all Courses
    const course = new Course(newCourseData);

    await course.save();

    let allCourses = await Course.find();

    //send saved succesfully
    res.status(201).json({ message: "Added Successfully", data: allCourses });
  } else {
    res.json({ message: courseValidate.errors });
    console.log(courseValidate.errors);
  }
};

const getCourseByID = async (req, res) => {
  //get id
  let searchId = +req.params.id;

  let allCourses = await Course.find();

  //find Student
  let foundCourse = allCourses.find((crs) => crs._id === searchId) || {};

  res.json({ data: foundCourse });
};

const updateCourseByID = async (req, res) => {
  //save id from params
  let searchId = +req.params.id;
  let updatedCourseData = req.body;
  //search in all Courses to find a student with this id
  let allCourses = await Course.find();
  let retIndex = allCourses.findIndex((crs) => crs._id == searchId);

  if (retIndex === -1) {
    res.json({ message: "Courses Not found With This Id " + searchId });
  } else {
    const valid = courseValidate(updatedCourseData);
    if (valid) {
      updatedCourseData._id = searchId;
      let updateRet = await Course.findOneAndUpdate(
        { _id: updatedCourseData._id },
        {
          $set: {
            name: updatedCourseData.name,
            deg: updatedCourseData.deg,
          },
        }
      );

      allCourses = await Course.find();
      res.json({
        message: "Updated Successfully",
        data: allCourses,
      });
    } else {
      res.json({ message: courseValidate.errors[0] });
    }
  }
};

const deleteCourseByID = async (req, res) => {
  //receive id
  let desiredID = +req.params.id;
  let allCourses = await Course.find();

  let foundVal = allCourses.findIndex((crs) => crs._id == desiredID);

  let deleteRes = await Course.findByIdAndDelete({ _id: desiredID });
  allCourses = await Course.find();

  if (foundVal != -1) {
    res.json({
      messgae: "deleted Successfully",
      data: allCourses,
    });
  } else {
    res.json({
      messgae: "No Course with this id to delete " + desiredID,
      data: allCourses,
    });
  }
};

module.exports = {
  getAllCourses,
  getCourseByID,
  updateCourseByID,
  addCourseToCrs,
  deleteCourseByID,
};
