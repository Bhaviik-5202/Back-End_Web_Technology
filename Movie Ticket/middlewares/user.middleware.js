var jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
  try {
    if (req.url.toString().indexOf("login") > -1) {
      next();
    } else {
      var decoded = jwt.verify(
        req.headers.authorization.split(" ")[1],
        "shhhhh",
      );
      next();
    }
  } catch (error) {
    res.status(401).send({ error: error, massage: "unauthorized" });
  }
}

module.exports = { userMiddleware };
