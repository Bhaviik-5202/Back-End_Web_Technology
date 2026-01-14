const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Book = require("../models/Book");

/* =========================================================
   GET /books?q=searchText
   Search by title, author, isbn, category
========================================================= */
router.get("/", async (req, res) => {
  try {
    const { q } = req.query;

    let filter = {};

    if (q && q.trim()) {
      const regex = new RegExp(q.trim(), "i");
      filter = {
        $or: [
          { title: regex },
          { author: regex },
          { isbn: regex },
          { category: regex },
        ],
      };
    }

    const books = await Book.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch books",
      error: error.message,
    });
  }
});

/* =========================================================
   POST /books
   Add new book
========================================================= */
router.post("/", async (req, res) => {
  try {
    const { title, author, isbn, category, isAvailable } = req.body;

    if (!title || !author) {
      return res.status(400).json({
        success: false,
        message: "Title and Author are required",
      });
    }

    const book = await Book.create({
      title,
      author,
      isbn,
      category,
      isAvailable,
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to add book",
      error: error.message,
    });
  }
});

/* =========================================================
   DELETE /books/:id
========================================================= */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Book ID" });
    }

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error: error.message,
    });
  }
});

/* =========================================================
   PATCH /books/:id/availability
========================================================= */
router.patch("/:id/availability", async (req, res) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Book ID" });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Toggle if value not passed
    book.isAvailable =
      typeof isAvailable === "boolean" ? isAvailable : !book.isAvailable;

    await book.save();

    res.status(200).json({
      success: true,
      message: "Book availability updated",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update availability",
      error: error.message,
    });
  }
});

module.exports = router;
