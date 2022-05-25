const http = require("http");
const fs = require("fs");

var indexBuffer;
var statusCode;
const serveIndex = function (req, res) {

    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(indexBuffer);

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

const server = http.createServer(serveIndex);