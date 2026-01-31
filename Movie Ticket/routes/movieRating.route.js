const express = require("express");
const {
  getAllMovieRating,
  getByIDMovieRating,
  insertMovieRating,
  updateMovieRating,
  deleteMovieRating,
} = require("../services/movieRating.service");

const movieRatingRoute = express.Router();

// get all movie rating

movieRatingRoute.get("/", async (req, res) => {
  const data = await getAllMovieRating();
  res.send(data);
});

// get by id movie rating

movieRatingRoute.get("/:id", async (req, res) => {
  const data = await getByIDMovieRating(req.params.id);
  res.send(data);
});

// insert movie rating

movieRatingRoute.post("/", async (req, res) => {
  const data = await insertMovieRating(req.body);
  res.send(data);
});

// update movie rating

movieRatingRoute.put("/:id", async (req, res) => {
  const data = await updateMovieRating(req.params.id, req.body);
  res.send(data);
});

// delete movie rating

movieRatingRoute.delete("/:id", async (req, res) => {
  const data = await deleteMovieRating(req.params.id);
  res.send(data);
});

module.exports = movieRatingRoute;
