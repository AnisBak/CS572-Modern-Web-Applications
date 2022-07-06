const express = require("express");
require("dotenv").config()
require("./api/data/db")
const routes = require("./api/routes")


const app = express();
app.use("/api", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
})


app.use(express.json());
app.use("/api", routes)

const server = app.listen(process.env.PORT, function () {
    console.log("Listening to port", server.address().port);
})