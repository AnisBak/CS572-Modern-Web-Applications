const express = require("express");
require("dotenv").config();
const routes = require("./api/routes");
require("./api/data/db");


const app = express();

app.use(express.json()); // binding callback function to events (all events using app-all coming requests)
//app.use(express.urlencoded());
app.use("/api", function (req, res, next) { // 
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, XRequested-With, Content-Type, Accept, authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Credentials", true);
    next();
})

app.use("/api", routes);// routes are like in a linkedList


const server = app.listen(process.env.PORT, function () {
    console.log("Listening to port", server.address().port)//this will get called and move on before the listen is put in the event loop
});
