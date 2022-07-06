const express = require("express");
require("dotenv").config();
const routes = require("./api/routes")
require("./api/data/db");

const app = express();

app.use(express.json());
app.use("/api", function (req, res, next) {
    //res.header('Access-Control-Allow-Origin', "*"); 
    
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    res.header('Access-Control-Allow-Methods', "*");
   
    //res.header('Access-Control-Allow-Origin', "http://localhost:4200/");
    next();
});
app.use("/api", routes);

const server = app.listen(process.env.PORT, function () {
    console.log("Listening to port", server.address().port);
})
