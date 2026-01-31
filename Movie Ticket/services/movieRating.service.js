const {
  movieRatingGetAll,
  movieRatingGetByID,
  movieRatingInsert,
  movieRatingUpdate,
  movieRatingDelete,
} = require("../models/movieRating.model");

async function getAllMovieRating() {
  const data = await movieRatingGetAll();
  if (data) {
    return {
      error: false,
      data,
      message: "fetched all movie ratings successfully",
    };
  } else {
    return {
      error: true,
      message: "some error occurred while getting all movie ratings",
    };
  }
}

async function getByIDMovieRating(id) {
  const data = await movieRatingGetByID(id);
  if (data) {
    return {
      error: false,
      data,
      message: "fetched movie rating successfully",
    };
  } else {
    return {
      error: true,
      message: "some error occurred while getting movie rating by id",
    };
  }
}
async function insertMovieRating(formData) {
  const data = await movieRatingInsert(formData);
  if (data) {
    return {
      error: false,
      data,
      message: "movie rating inserted successfully",
    };
  } else {
    return {
      error: true,
      message: "some error occurred while inserting movie rating",
    };
  }
}
async function updateMovieRating(id, formData) {
  const data = await movieRatingUpdate(id, formData);
  if (data) {
    return {
      error: false,
      data,
      message: "movie rating updated successfully",
    };
  } else {
    return {
      error: true,
      message: "some error occurred while updating movie rating",
    };
  }
}
async function deleteMovieRating(id) {
  const data = await movieRatingDelete(id);
  if (data) {
    return {
      error: false,
      data,
      message: "movie rating deleted successfully",
    };
  } else {
    return {
      error: true,
      message: "some error occurred while deleting movie rating",
    };
  }
}

module.exports = {
  deleteMovieRating,
  updateMovieRating,
  insertMovieRating,
  getByIDMovieRating,
  getAllMovieRating,
};
