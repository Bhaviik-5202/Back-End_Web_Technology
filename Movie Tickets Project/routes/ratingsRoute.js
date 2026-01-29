// routes/ratingsRoute.js
const express = require("express");
const router = express.Router();
const ratingsService = require("../services/ratingsService");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  try {
    const result = await ratingsService.getAllRatings();

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
    const result = await ratingsService.getRatingById(req.params.id);

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

router.get("/user/:userId", authMiddleware, async (req, res) => {
  try {
    if (req.user.user_id != req.params.userId) {
      return res.status(403).json({
        error: true,
        message: "You can only view your own ratings",
      });
    }

    const result = await ratingsService.getRatingsByUserId(req.params.userId);

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

router.get("/movie/:movieId", async (req, res) => {
  try {
    const result = await ratingsService.getRatingsByMovieId(req.params.movieId);

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

router.post("/", authMiddleware, async (req, res) => {
  try {
    req.body.user_id = req.user.user_id;

    const result = await ratingsService.createRating(req.body);

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
    const existingRating = await ratingsService.getRatingById(req.params.id);

    if (existingRating.error) {
      return res.status(404).json(existingRating);
    }

    if (req.user.user_id != existingRating.data.user_id) {
      return res.status(403).json({
        error: true,
        message: "You can only update your own ratings",
      });
    }

    const result = await ratingsService.updateRating(req.params.id, req.body);

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
    const existingRating = await ratingsService.getRatingById(req.params.id);

    if (existingRating.error) {
      return res.status(404).json(existingRating);
    }

    if (req.user.user_id != existingRating.data.user_id) {
      return res.status(403).json({
        error: true,
        message: "You can only delete your own ratings",
      });
    }

    const result = await ratingsService.deleteRating(req.params.id);

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
