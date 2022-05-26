const express = require("express");
const path = require("path");
const router = express.Router();
const gamesController = require("../controller/json.controller")

router.route(["/json", "/j"])
    .get(jsonController.json);

// only routing is in here separation of concerns


router.route("/games").get(gamesController.getAll);

router.route("/games/:x").get(gamesController.getOne); // escaping x
module.exports = router;