const express = require('express');
const app = express();

const simpleMiddleware = (req, res, next) => {
    if( req.query.admin === 'true' ) {
        console.log("MiddleWare Called...");
        console.log("Reqest URL : ", req.url);
        console.log("Reqest Method : ", req.method);
        next();
    }
    else {
        res.send("Access Denied...!");
    }
};

app.get("/", simpleMiddleware, (req, res) => {
    res.send("WelCome Admin.....");
});

app.listen(3000, () => {
    console.log("Server Starting At @3000....");

});
