const http = require("http");
const fs = require("fs");

const readIndexAndServer = function (req, res) {
    //const buffer = fs.readFileSync("index.html");
    const buffer = fs.readFileSync("public/index.html"); // Path module help with different OS paths because they are different in MAC and Windows
    res.setHeader("Content-Type","text/html");// so the path module is just an IF statement
    res.writeHead(200);
    res.end(buffer);
}



const helloWorld = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end('{"message":"Hello World!"}');
}



const server = http.createServer(readIndexAndServer);
server.listen(8080, "localhost", function () {
    console.log("Server is running!");
})