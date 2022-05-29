const express = require("express");
const router = express.Router();
const gamesController = require("../controller/games.controller")

router.route("/games").get(gamesController.getAll)
router.route("/games/:gameId").get(gamesController.getOne)
router.route("/games").post(gamesController.addOne);
router.route("/games").delete(gamesController.deleteOne)


module.exports = router;