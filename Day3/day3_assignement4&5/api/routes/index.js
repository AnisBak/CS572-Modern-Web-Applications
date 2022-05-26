const express = require("express");
const router = express.Router();
const studentController = require("../controller/students.controller")

router.route("/students").get(studentController.getAll);
router.route("/students/:x").get(studentController.getOne);


module.exports = router;