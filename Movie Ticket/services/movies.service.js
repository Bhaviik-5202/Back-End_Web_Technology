const e = require("express");
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
      massage: "movies fatched successfull",
    };
  } else {
    return {
      error: true,
      massage: "some error occured due to get all movies",
    };
  }
}

async function getMovieByID(id) {
  const data = await movieGetByID(id);
  if (data) {
    return {
      error: false,
      data,
      massage: "movie by id fatched successfull",
    };
  } else {
    return {
      error: true,
      massage: "some error occured due to get movie by id ",
    };
  }
}

async function insertMovie(formData) {
  const data = await movieInsert(formData);
  if (data) {
    return {
      error: false,
      data,
      massage: "movie inserted successfull",
    };
  } else {
    return {
      error: true,
      massage: "some error occured due to insert movie",
    };
  }
}

async function updateMovie(id, formData) {
  const data = await movieUpdate(id, formData);
  if (data) {
    return {
      error: false,
      data,
      massage: "movie update successfull",
    };
  } else {
    return {
      error: true,
      massage: "some error occured due to update movie",
    };
  }
}

async function deleteMovie(id, formData) {
  const data = await movieDelete(id, formData);
  if (data) {
    return {
      error: false,
      data,
      massage: "movie delete successfull",
    };
  } else {
    return {
      error: true,
      massage: "some error occured due to delete movie",
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
