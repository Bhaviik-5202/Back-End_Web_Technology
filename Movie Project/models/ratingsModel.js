// models/ratingsModel.js
const db = require("../db/connection");

const ratingsModel = {
  getAllRatings: async () => {
    try {
      const [rows] = await db.query(
        `SELECT r.*, u.username, m.movie_name 
                 FROM ratings r 
                 JOIN users u ON r.user_id = u.user_id 
                 JOIN movies m ON r.movie_id = m.movie_id`,
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getRatingById: async (id) => {
    try {
      const [rows] = await db.query(
        `SELECT r.*, u.username, m.movie_name 
                 FROM ratings r 
                 JOIN users u ON r.user_id = u.user_id 
                 JOIN movies m ON r.movie_id = m.movie_id 
                 WHERE r.rating_id = ?`,
        [id],
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  createRating: async (ratingData) => {
    try {
      const [result] = await db.query(
        "INSERT INTO ratings (movie_id, user_id, stars, comment) VALUES (?, ?, ?, ?)",
        [
          ratingData.movie_id,
          ratingData.user_id,
          ratingData.stars,
          ratingData.comment,
        ],
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  updateRating: async (id, ratingData) => {
    try {
      const [result] = await db.query(
        "UPDATE ratings SET stars = ?, comment = ? WHERE rating_id = ?",
        [ratingData.stars, ratingData.comment, id],
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  deleteRating: async (id) => {
    try {
      const [result] = await db.query(
        "DELETE FROM ratings WHERE rating_id = ?",
        [id],
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  getRatingsByUserId: async (userId) => {
    try {
      const [rows] = await db.query(
        `SELECT r.*, m.movie_name, m.movie_image 
                 FROM ratings r 
                 JOIN movies m ON r.movie_id = m.movie_id 
                 WHERE r.user_id = ?`,
        [userId],
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getRatingsByMovieId: async (movieId) => {
    try {
      const [rows] = await db.query(
        `SELECT r.*, u.username 
                 FROM ratings r 
                 JOIN users u ON r.user_id = u.user_id 
                 WHERE r.movie_id = ?`,
        [movieId],
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = ratingsModel;
