const express = require("express");
const router = express.Router();
const multiplyController = require("../controller/multiply.controller")

router.route("/multiply/:firstNumber").get(multiplyController.get)

module.exports = router;