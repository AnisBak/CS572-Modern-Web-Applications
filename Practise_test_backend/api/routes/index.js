const express = require("express");
const router = express.Router();
const jobsController = require("../controller/jobs.controller")

router.route("/jobs").get(jobsController.getAll).post(jobsController.addOne);
router.route("/jobs/:jobId").get(jobsController.getOne).put(jobsController.fullUpdate).patch(jobsController.partialUpdate).delete(jobsController.deleteOne);
router.route("/jobs/search/:skill").get(jobsController.getOneBySkill)
/*-router.route("/games/:gameId/publisher").get(publisherController.getOne).post(publisherController.addOne).put(publisherController.fullUpdateOne).patch(publisherController.partialUpdateOne).delete(publisherController.deletePublisher);*/




module.exports = router;