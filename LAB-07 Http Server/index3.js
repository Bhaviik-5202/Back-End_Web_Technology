const http = require('http');
const fs = require('fs');
const { error } = require('console');

const server = http.createServer((req, res) => {
    if( req.url == '/') {
        res.write("Hello Wolrd From Server...!");
        res.end();
        return;
    }
    else if (req.url == '/home') {
        fs.readFile("Home.txt", 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err.message);
            }
            else {
                res.end(data);
                return;
            }
        });
    }
    else if (req.url == '/about') {
        fs.readFile("About.txt", 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err.message);
            }
            else {
                res.end(data);
                return;
            }
        });
    }
    else if (req.url == '/contact') {
        fs.readFile("Contact.txt", 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err.message);
            }
            else {
                res.end(data);
                return;
            }
        });
    }
    else if (req.url == '/feedback') {
        fs.readFile("Feedback.txt", 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err.message);
            }
            else {
                res.end(data);
                return;
            }
        });
    }
    else {
        res.end("Please, Valid Enter URL....!!!");
    }
   
});

server.listen(3050, () =>{
    console.log("Server Starting At @3050.....!!!");
});