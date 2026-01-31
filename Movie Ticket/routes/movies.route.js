const express = require("express");
const {
  getAllMovies,
  getMovieByID,
  insertMovie,
  updateMovie,
  deleteMovie,
} = require("../services/movies.service");

const routeMovie = express.Router();

// getAll movies
routeMovie.get("/", async (req, res) => {
  const data = await getAllMovies();
  res.send(data);
});

// get by id
routeMovie.get("/:id", async (req, res) => {
  const data = await getMovieByID(req.params.id);
  res.send(data);
});

// insert movie
routeMovie.post("/", async (req, res) => {
  const data = await insertMovie(req.body);
  res.send(data);
});

// update movie
routeMovie.put("/:id", async (req, res) => {
  const data = await updateMovie(req.params.id, req.body);
  res.send(data);
});

// delete Movie
routeMovie.delete("/:id", async (req, res) => {
  const data = await deleteMovie(req.params.id);
  res.send(data);
});

module.exports = routeMovie;
