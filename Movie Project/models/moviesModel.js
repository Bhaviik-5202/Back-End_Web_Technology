// models/moviesModel.js
const db = require("../db/connection");

const moviesModel = {
  getAllMovies: async () => {
    try {
      const [rows] = await db.query("SELECT * FROM movies");
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getMovieById: async (id) => {
    try {
      const [rows] = await db.query("SELECT * FROM movies WHERE movie_id = ?", [
        id,
      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  createMovie: async (movieData) => {
    try {
      const [result] = await db.query(
        "INSERT INTO movies (movie_name, movie_image) VALUES (?, ?)",
        [movieData.movie_name, movieData.movie_image],
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  updateMovie: async (id, movieData) => {
    try {
      const [result] = await db.query(
        "UPDATE movies SET movie_name = ?, movie_image = ? WHERE movie_id = ?",
        [movieData.movie_name, movieData.movie_image, id],
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  deleteMovie: async (id) => {
    try {
      const [result] = await db.query("DELETE FROM movies WHERE movie_id = ?", [
        id,
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  getMovieWithRatings: async (movieId) => {
    try {
      const [movie] = await db.query(
        "SELECT * FROM movies WHERE movie_id = ?",
        [movieId],
      );

      const [ratings] = await db.query(
        `SELECT r.*, u.username 
                 FROM ratings r 
                 JOIN users u ON r.user_id = u.user_id 
                 WHERE r.movie_id = ?`,
        [movieId],
      );

      return {
        ...movie[0],
        ratings,
      };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = moviesModel;
