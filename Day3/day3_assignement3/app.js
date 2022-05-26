const express = require("express");
require("dotenv").config();

const routes = require("./api/routes");

const app = express();

app.use("/", routes);

const server = app.listen(process.env.PORT, function () {
    console.log("Listening to port", server.address().port)
});
