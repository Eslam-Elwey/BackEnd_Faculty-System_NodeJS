const express = require("express");

const router = express.Router();

const courseController = require("../Controllers/CourseController");

// #region getAll Courses
router.get("/", courseController.getAllCourses);
//#endregion

// #region get Course With ID
router.get("/:id", courseController.getCourseByID);
//#endregion

// #region Update Course With ID
router.put("/:id", courseController.updateCourseByID);
//#endregion

// #region Add Course
router.post("/", courseController.addCourseToCrs);
//#endregion

// #region delete Course with ID
router.delete("/:id", courseController.deleteCourseByID);
//#endregion

module.exports = router;
