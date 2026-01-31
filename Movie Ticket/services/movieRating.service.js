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
      massage: "fatching all movie rating successfull",
    };
  } else {
    return {
      error: true,
      massage: "some error occured in get all movie raing",
    };
  }
}

async function getByIDMovieRating(id) {
  const data = await movieRatingGetByID(id);
  if (data) {
    return {
      error: false,
      data,
      massage: "fatching  movie rating by id successfull",
    };
  } else {
    return {
      error: true,
      massage: "some error occured in get movie raing by id",
    };
  }
}
async function insertMovieRating(formData) {
  const data = await movieRatingInsert(formData);
  if (data) {
    return {
      error: false,
      data,
      massage: "insert movie rating successfull",
    };
  } else {
    return {
      error: true,
      massage: "some error occured in insert movie raing",
    };
  }
}
async function updateMovieRating(id, formData) {
  const data = await movieRatingUpdate(id, formData);
  if (data) {
    return {
      error: false,
      data,
      massage: "update movie rating successfull",
    };
  } else {
    return {
      error: true,
      massage: "some error occured in updating movie raing",
    };
  }
}
async function deleteMovieRating(id) {
  const data = await movieRatingDelete(id);
  if (data) {
    return {
      error: false,
      data,
      massage: "delete movie rating successfull",
    };
  } else {
    return {
      error: true,
      massage: "some error occured in deleting movie raing",
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
