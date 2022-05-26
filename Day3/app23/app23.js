const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();

const routes = require("./routes");

app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();// because there's next, non terminating
})

app.use("/api", routes); // terminating middleware

// static routes in public for our html stuff 
app.use(express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT, function () {
    console.log("Server running!");
});