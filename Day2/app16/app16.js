const http = require("http");
const fs = require("fs");

var indexBuffer;
var statusCode;
const serveAllRequests = function (req, res) {

    switch (req.url) {
        case "/json":
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end('{"message" : "Hello World!"}');
            break;
        case "/":
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(indexBuffer);
            break;
    }
}


fs.readFile(__dirname + "/index.html", function (err, buffer) {
    if (err) {
        indexBuffer = "File not found";
        statusCode = 404;
    } else {
        indexBuffer = buffer;
        statusCode = 200;
    }
    server.listen(8080, "localhost", function () {
        console.log("Server is running!");
    })
});

const server = http.createServer(serveAllRequests);