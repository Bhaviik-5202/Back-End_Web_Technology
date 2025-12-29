// Create a hello world webapp using “http” core module in NodeJS. (A)
const http = require('http');

const server = http.createServer((req,res) => {
    res.statusCode = 200;
    if(req.url == '/') {
        res.write("Hello Wolrd From Server...!");
        res.end();
        return;
    }
    else if(req.url == '/favicon.ico') {
        res.end();
        return;
    }
    else {
        res.write("Please, Valid Enter URL....!!!");
    }
    console.log("Referesh", req.url);
    res.end();
});

server.listen(3000, () => {
    console.log("Server Starting @3000...!");
});