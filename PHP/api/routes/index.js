const express = require("express");
const router = express.Router();

const albumsRoutes = require("./albums");
const userRoutes = require("./users");


router.use("/users", userRoutes);
router.use("/albums",albumsRoutes);






module.exports = router;