const { log } = require('console');
const http = require('http');

const server = http.createServer((req, res) => {
    if( req.url == '/') {
        res.statusCode = 200;
        res.write("Hello Wolrd From Server...!");
        res.end();
        return;
    }
    else if( req.url == '/favicon.ico') {
        res.end();
        return;
    }
    else if( req.url == '/home') {
        res.write("Hello From HOME...!");
        res.end();
        return;
    }
    else if( req.url == '/about') {
        res.write("Hello From ABOUT...!");
        res.end();
        return;
    }
    else if( req.url == '/contact') {
        res.write("Hello From CONTACT...!");
        res.end();
        return;
    }
    else if( req.url == '/feedback') {
        res.write("Hello From FEEDBACK...!");
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