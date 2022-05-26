const express = require("express");
const path = require("path");
const router = express.Router();


router.route(["/json", "/j"])
    .get(function (req, res) {
    res.status(200).json({ "JSON Data": "True" })
})




module.exports = router;