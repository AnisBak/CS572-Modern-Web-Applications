const express = require("express");
const router = express.Router();
const albumController = require("../controller/album.controller");
// const authenticationController = require("../controller/authentication.controller");
const songController = require("../controller/song.controller");

router.route("").get(albumController.getAll).post(/*authenticationController.authenticate,*/ albumController.addOne);//Binding 

router.route("/:albumId/songs").get(songController.getAll).post(songController.addOne);
router.route("/:albumId/songs/:songId").get(songController.getOne).delete(songController.deleteOne).patch(songController.partialUpdateOne);
router.route("/:albumId").get(albumController.getOne).put(albumController.fullUpdateOne).patch(albumController.partialUpdateOne).delete(albumController.deleteOne);







module.exports = router;