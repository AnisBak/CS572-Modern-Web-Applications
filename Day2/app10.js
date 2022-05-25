const http = require("http");

const helloWorld = function (req, res) {
    res.writeHead(200);
    res.end("Hello Wordl!");
}

const server = http.createServer(helloWorld);

server.listen(8080, function () {
    console.log("Server is running!");
})