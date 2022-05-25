const http = require("http");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

var indexBuffer;
var statusCode;
const serveAllRequests = function (req, res) {
    
    if (req.url === "/")
        req.url = "/index.html";
    fs.readFile(path.join(__dirname,req.url), function (err, buffer) {
        if (err) {
            indexBuffer = "File not found";
            statusCode = 404;
        } else {
            indexBuffer = buffer;
            statusCode = 200;

            switch (req.method) {
                case "GET":
                    res.setHeader("Content-Type", "text/html");
                    res.writeHead(200);
                    res.end(indexBuffer);
                    break;
                case "POST":
                    res.setHeader("Content-Type", "application/json");
                    res.writeHead(200);
                    res.end('{"message" : "Hello World!"}');
                    break;
            }
        }
    });

}

const server = http.createServer(serveAllRequests);
server.listen(process.env.PORT, "localhost", function () {
    console.log("Server is running!");
})