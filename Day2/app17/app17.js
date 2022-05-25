const express = require("express");
require("dotenv").config(); // read the environment variable
const path = require("path");
const app = express();

app.get(["/","/json"], function (req , res) {
    console.log("Get received");
    res.status(200).json({ "JSON Data": "True" })
})
//var port = 4000;
//app.set("port", 3000);
app.use("/public", express.static(path.join(__dirname, "public")));// put all files wanted in the public folder
console.log(process.env.PORT);// here it will be undefined

const server = app.listen(process.env.PORT/*app.get("port")*/, function () {
    
    console.log("Listening to port: " + server.address().port); // diffenrence from the previous just port because we just  requested to listen to port
});

