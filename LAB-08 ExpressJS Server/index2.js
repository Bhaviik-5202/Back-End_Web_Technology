const express = require('express');
const { log } = require('node:console');

const app = express();

app.get('/', (req, res) => {
    res.send("Hello Wolrd Form ExpressJs...");
});

app.get('/home', (req, res) => {
    res.send("HOME Page");
});

app.get('/about', (req, res) => {
    res.send("ABOUT Page");
});

app.get('/contact', (req, res) => {
    res.send("CONTACT Page");
});

app.get('/feedback', (req, res) => {
    res.send("FEEDBACK Page");
});

app.listen(3050, () => {
    console.log("Server Starting At @3050....");  
});