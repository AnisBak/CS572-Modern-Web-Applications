const express = require("express");
const router = express.Router();
const flightsController = require("../controller/flights.controller")

router.route("/flights").get(flightsController.getAll);
router.route("/flights/:flightId").get(flightsController.getOne);

module.exports = router;