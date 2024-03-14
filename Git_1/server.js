const http = require("http");

const port = 5000;
const hostname = "127.0.0.1";

let server = new http.createServer(function (req, res) {
    res.setHeader("Content-Type", "text/html; charset=utf-8;");
    res.write("<h1>Test!</h1>");
    res.statusCode = 200;
    res.end();
});

server.listen(port, hostname, () => {
    console.log(`Server is started at http://${hostname}:${port}/`);
});
