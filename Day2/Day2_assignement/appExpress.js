const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();


app.get(["/","/index.html"], function (req , res) {
    res.status(200).sendFile(path.join(__dirname,"index.html"));
})

app.get("/page1.html", function (req , res) {
    res.status(200).sendFile(path.join(__dirname,"page1.html"));
})

app.get("/page2.html", function (req , res) {
    res.status(200).sendFile(path.join(__dirname,"page2.html"));
})
app.post("*",function (req , res) {
    res.status(200).json({ "JSON Data": "True" })
})


app.listen(process.env.PORT, function () {
    console.log("Server running!");
});