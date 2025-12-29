const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.send("Hello, /hello.txt Runnnig in URL....")
});

app.listen(3000, () => {
    console.log("Server Starting @3000.....");
});