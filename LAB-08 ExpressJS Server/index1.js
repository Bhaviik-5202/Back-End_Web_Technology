const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("Hello Wolrd Form ExpressJS....");
});

app.listen(3000, () => {
    console.log("Server Starting At @3000....");
    
});