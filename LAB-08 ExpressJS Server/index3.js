const express = require('express');
const fs = require('fs');
const { log } = require('node:console');

const app = express();

app.get('/', (req, res) => {
    res.send(`My DATA TO ${JSON.stringify(data)}`);
});

const data = {
    name : 'BHAVIIK',
    age : 18,
    clg : "DU"
};

app.get('/home', (req, res) => {
    fs.readFile("Home.txt", 'utf8', (err, data) => {
            if (err) {
                res.status(404).send(err);
            }
            else {
                res.send(data);
                return;
            }
        });
});

app.get('/about', (req, res) => {
    fs.readFile("About.txt", 'utf8', (err, data) => {
            if (err) {
                res.status(404).send(err);
            }
            else {
                res.send(data);
                return;
            }
        });
});

app.get('/feedback', (req, res) => {
    fs.readFile("Feedback.txt", 'utf8', (err, data) => {
            if (err) {
                res.status(404).send(err);
            }
            else {
                res.send(data);
                return;
            }
        });
});

app.get('/contact', (req, res) => {
    fs.readFile("Contact.txt", 'utf8', (err, data) => {
            if (err) {
                res.status(404).send(err);
            }
            else {
                res.send(data);
                return;
            }
        });
});
   
app.listen(3080, () => {
    console.log("Server Starting At @3080....");  
});