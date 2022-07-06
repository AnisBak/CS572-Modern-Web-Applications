const express = require("express");
const router = express.Router();
const userController = require("../controller/users.controller");

router.route("").post(userController.addOne).put(userController.getOne);// put it in separate route fil
module.exports = router;