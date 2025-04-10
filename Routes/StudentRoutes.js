const express = require("express");

const router = express.Router();

const studentController = require("../Controllers/StudentController");

// #region getAll Students
router.get("/", studentController.getAllStudents);
//#endregion

// #region get Student With ID
router.get("/:id", studentController.getStudentByID);
//#endregion

// #region Update Student With ID
router.put("/:id", studentController.updateStudentDataByID);
//#endregion

// #region Add Student
router.post("/", studentController.addStudentToStds);
//#endregion

// #region delete Studentwith ID
router.delete("/:id", studentController.deleteStudentByID);
//#endregion

module.exports = router;
