const express = require('express');
const app = express();

const simpleMiddleware = (req, res, next) => {
    console.log("Middleware Executed...");
    console.log("Request URL :", req.url);
    console.log("Request Method :", req.method);

    if (req.query.admin === 'true') {
        next();
    } 
    else if (req.query.user === 'user1') {
        next();
    }
    else {
        res.send("Access Denied...!");
    }
};

app.get("/admin", simpleMiddleware, (req, res) => {
    res.send("Welcome Admin...");
});

app.get("/about", simpleMiddleware, (req, res) => {
    res.send("About Page");
});

app.get("/feedback", simpleMiddleware, (req, res) => {
    res.send("Feedback Page");
});

app.listen(3000, () => {
    console.log("Server Starting At @3000....");
});
