// routes/usersRoute.js
const express = require("express");
const router = express.Router();
const usersService = require("../services/usersService");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const result = await usersService.registerUser(req.body);

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

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: true,
        message: "Username and password are required",
      });
    }

    const result = await usersService.loginUser(username, password);

    if (result.error) {
      return res.status(401).json(result);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Server error",
    });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await usersService.getAllUsers();

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

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const result = await usersService.getUserById(req.params.id);

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

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.user_id != req.params.id) {
      return res.status(403).json({
        error: true,
        message: "You can only update your own profile",
      });
    }

    const result = await usersService.updateUser(req.params.id, req.body);

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
    if (req.user.user_id != req.params.id) {
      return res.status(403).json({
        error: true,
        message: "You can only delete your own account",
      });
    }

    const result = await usersService.deleteUser(req.params.id);

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
