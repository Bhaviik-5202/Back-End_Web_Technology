const {
  movieGetAll,
  movieGetByID,
  movieInsert,
  movieUpdate,
  movieDelete,
} = require("../models/movies.model");

async function getAllMovies() {
  const data = await movieGetAll();
  if (data) {
    return {
      error: false,
      data,
      message: "movies fetched successfully",
    };
  } else {
    return {
      error: true,
      message: "some error occurred while getting all movies",
    };
  }
}

async function getMovieByID(id) {
  const data = await movieGetByID(id);
  if (data) {
    return {
      error: false,
      data,
      message: "movie fetched successfully",
    };
  } else {
    return {
      error: true,
      message: "some error occurred while getting movie by id",
    };
  }
}

async function insertMovie(formData) {
  const data = await movieInsert(formData);
  if (data) {
    return {
      error: false,
      data,
      message: "movie inserted successfully",
    };
  } else {
    return {
      error: true,
      message: "some error occurred while inserting movie",
    };
  }
}

async function updateMovie(id, formData) {
  const data = await movieUpdate(id, formData);
  if (data) {
    return {
      error: false,
      data,
      message: "movie updated successfully",
    };
  } else {
    return {
      error: true,
      message: "some error occurred while updating movie",
    };
  }
}

async function deleteMovie(id) {
  const data = await movieDelete(id);
  if (data) {
    return {
      error: false,
      data,
      message: "movie deleted successfully",
    };
  } else {
    return {
      error: true,
      message: "some error occurred while deleting movie",
    };
  }
}

module.exports = {
  deleteMovie,
  updateMovie,
  insertMovie,
  getMovieByID,
  getAllMovies,
};
