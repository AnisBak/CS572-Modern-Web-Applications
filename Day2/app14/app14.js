const http = require("http");
const fs = require("fs");

var indexBuffer;

const serveIndex = function (req, res) {

    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(indexBuffer);

}


fs.readFile(__dirname + "/index.html", function (err, buffer) {
    indexBuffer = buffer;
    server.listen(8080, "localhost", function () {
        console.log("Server is running!");
    })
});

const server = http.createServer(serveIndex);

