const express = require("express");
const router = express.Router();
const gamesController = require("../controller/games.controller");
const publisherController = require("../controller/publishers.controller");

router.route("/games").get(gamesController.getAll)
router.route("/games/:gameId").get(gamesController.getOne);
router.route("/games/:gameId/publisher").get(publisherController.getOne);
router.route("/games/:gameId/reviews").get(publisherController.getAll);
router.route("/games/:gameId/reviews/:reviewId").get(publisherController.getOne);




module.exports = router;