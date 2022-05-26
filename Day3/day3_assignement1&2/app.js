const express = require("express");
require("dotenv").config();
const path = require("path");
const routes = require("./api/routes");

const app = express();

app.use("/css", function (req, res, next) {
    console.log(req.method, req.url);
    next();
});



app.use(express.static(path.join(__dirname, "public")));

app.use("/api", routes);


const server = app.listen(process.env.PORT, function () {
    console.log("Listening to port", server.address().port)
});
