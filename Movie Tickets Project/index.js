const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
console.log("Environment check - Port:", process.env.PORT);
console.log("Environment check - DB_HOST:", process.env.DB_HOST);
console.log("Environment check - DB_USER:", process.env.DB_USER);
console.log("Environment check - DB_PASSWORD set:", !!process.env.DB_PASSWORD);
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRoute = require("./routes/usersRoute");
const moviesRoute = require("./routes/moviesRoute");
const ratingsRoute = require("./routes/ratingsRoute");

app.use("/api/users", usersRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/ratings", ratingsRoute);

app.get("/", (req, res) => {
  res.json({ message: "Movie Rating API is working!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
