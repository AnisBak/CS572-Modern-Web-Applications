const express = require("express");
const router = express.Router();
const gamesController = require("../controller/games.controller");
const publisherController = require("../controller/publishers.controller");
const reviewController = require("../controller/reviews.controller");

router.route("/games").get(gamesController.getAll)
router.route("/games/:gameId").get(gamesController.getOne).put(gamesController.fullUpdateOne).patch(gamesController.partialUpdateOne).delete(gamesController.deleteOne);
router.route("/games/:gameId/reviews").get(reviewController.getAll).post(reviewController.addOne);
router.route("/games/:gameId/reviews/:reviewId").get(reviewController.getOne);
router.route("/games/").get(gamesController.getAll).post(gamesController.addOne);
router.route("/games/:gameId/publisher").get(publisherController.getOne).post(publisherController.addOne).put(publisherController.fullUpdateOne).patch(publisherController.partialUpdateOne).delete(publisherController.deletePublisher);





module.exports = router;