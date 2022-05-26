const express = require("express");
const path = require("path");
const router = express.Router();
const jsonController = require("../controller/json.controller")

router.route(["/json", "/j"])
    .get(jsonController.json);

// only routing is in here separation of concerns


module.exports = router;