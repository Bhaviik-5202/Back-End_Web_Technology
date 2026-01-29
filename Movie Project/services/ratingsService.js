// services/ratingsService.js
const ratingsModel = require("../models/ratingsModel");

const ratingsService = {
  getAllRatings: async () => {
    try {
      const ratings = await ratingsModel.getAllRatings();
      return {
        error: false,
        data: ratings,
        message: "Ratings fetched successfully",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },

  getRatingById: async (id) => {
    try {
      const rating = await ratingsModel.getRatingById(id);
      if (!rating) {
        return {
          error: true,
          message: "Rating not found",
        };
      }
      return {
        error: false,
        data: rating,
        message: "Rating fetched successfully",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },

  getRatingsByUserId: async (userId) => {
    try {
      const ratings = await ratingsModel.getRatingsByUserId(userId);
      return {
        error: false,
        data: ratings,
        message: "User ratings fetched successfully",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },

  getRatingsByMovieId: async (movieId) => {
    try {
      const ratings = await ratingsModel.getRatingsByMovieId(movieId);
      return {
        error: false,
        data: ratings,
        message: "Movie ratings fetched successfully",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },

  createRating: async (ratingData) => {
    try {
      if (!ratingData.movie_id || !ratingData.user_id || !ratingData.stars) {
        return {
          error: true,
          message: "Movie ID, User ID and stars are required",
        };
      }

      if (ratingData.stars < 1 || ratingData.stars > 5) {
        return {
          error: true,
          message: "Stars must be between 1 and 5",
        };
      }

      const result = await ratingsModel.createRating(ratingData);

      return {
        error: false,
        data: { rating_id: result.insertId, ...ratingData },
        message: "Rating created successfully",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },

  updateRating: async (id, ratingData) => {
    try {
      const existingRating = await ratingsModel.getRatingById(id);
      if (!existingRating) {
        return {
          error: true,
          message: "Rating not found",
        };
      }

      if (ratingData.stars && (ratingData.stars < 1 || ratingData.stars > 5)) {
        return {
          error: true,
          message: "Stars must be between 1 and 5",
        };
      }

      const result = await ratingsModel.updateRating(id, ratingData);

      return {
        error: false,
        data: { affectedRows: result.affectedRows },
        message: "Rating updated successfully",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },

  deleteRating: async (id) => {
    try {
      const existingRating = await ratingsModel.getRatingById(id);
      if (!existingRating) {
        return {
          error: true,
          message: "Rating not found",
        };
      }

      const result = await ratingsModel.deleteRating(id);

      return {
        error: false,
        data: { affectedRows: result.affectedRows },
        message: "Rating deleted successfully",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },
};

module.exports = ratingsService;
