const express = require("express");
const routeUser = require("./routes/users.route");
const routeMovie = require("./routes/movies.route");
const movieRatingRoute = require("./routes/movieRating.route");

const app = express();

app.use(express.json());

app.use("/users", routeUser);
app.use("/movies", routeMovie);
app.use("/movie_rating", movieRatingRoute);

app.listen(3000, () => {
  console.log("server has started @ 3000");
});
