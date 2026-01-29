// routes/moviesRoute.js
const express = require("express");
const router = express.Router();
const moviesService = require("../services/moviesService");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  try {
    const result = await moviesService.getAllMovies();

    if (result.error) {
      return res.status(400).json(result);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Server error",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await moviesService.getMovieById(req.params.id);

    if (result.error) {
      return res.status(404).json(result);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Server error",
    });
  }
});

router.get("/:id/ratings", async (req, res) => {
  try {
    const result = await moviesService.getMovieWithRatings(req.params.id);

    if (result.error) {
      return res.status(404).json(result);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Server error",
    });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { movie_name, movie_image } = req.body;

    if (!movie_name) {
      return res.status(400).json({
        error: true,
        message: "Movie name is required",
      });
    }

    const result = await moviesService.createMovie(req.body);

    if (result.error) {
      return res.status(400).json(result);
    }

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Server error",
    });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const result = await moviesService.updateMovie(req.params.id, req.body);

    if (result.error) {
      return res.status(400).json(result);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Server error",
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const result = await moviesService.deleteMovie(req.params.id);

    if (result.error) {
      return res.status(400).json(result);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Server error",
    });
  }
});

module.exports = router;
