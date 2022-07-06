const express = require("express");
require("dotenv").config();
const routes = require("./api/routes");
//require("./api/data/dbconnection.js").open();
require("./api/data/db");


const app = express();

app.use(express.json());
//app.use(express.urlencoded());

app.use("/api", routes);


const server = app.listen(process.env.PORT, function () {
    console.log("Listening to port", server.address().port)
});
