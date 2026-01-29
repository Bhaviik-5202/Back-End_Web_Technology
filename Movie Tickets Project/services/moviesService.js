// services/moviesService.js
const moviesModel = require("../models/moviesModel");

const moviesService = {
  getAllMovies: async () => {
    try {
      const movies = await moviesModel.getAllMovies();
      return {
        error: false,
        data: movies,
        message: "Movies fetched successfully",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },

  getMovieById: async (id) => {
    try {
      const movie = await moviesModel.getMovieById(id);
      if (!movie) {
        return {
          error: true,
          message: "Movie not found",
        };
      }
      return {
        error: false,
        data: movie,
        message: "Movie fetched successfully",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },

  getMovieWithRatings: async (id) => {
    try {
      const movie = await moviesModel.getMovieWithRatings(id);
      if (!movie) {
        return {
          error: true,
          message: "Movie not found",
        };
      }
      return {
        error: false,
        data: movie,
        message: "Movie with ratings fetched successfully",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },

  createMovie: async (movieData) => {
    try {
      const result = await moviesModel.createMovie(movieData);

      return {
        error: false,
        data: { movie_id: result.insertId, ...movieData },
        message: "Movie created successfully",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },

  updateMovie: async (id, movieData) => {
    try {
      const existingMovie = await moviesModel.getMovieById(id);
      if (!existingMovie) {
        return {
          error: true,
          message: "Movie not found",
        };
      }

      const result = await moviesModel.updateMovie(id, movieData);

      return {
        error: false,
        data: { affectedRows: result.affectedRows },
        message: "Movie updated successfully",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },

  deleteMovie: async (id) => {
    try {
      const existingMovie = await moviesModel.getMovieById(id);
      if (!existingMovie) {
        return {
          error: true,
          message: "Movie not found",
        };
      }

      const result = await moviesModel.deleteMovie(id);

      return {
        error: false,
        data: { affectedRows: result.affectedRows },
        message: "Movie deleted successfully",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },
};

module.exports = moviesService;
