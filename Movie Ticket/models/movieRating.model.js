const db = require("../db/mysql");

async function movieRatingGetAll() {
  try {
    const [data, fields] = await db.query(`select * from movie_rating`);
    return data;
  } catch (error) {
    console.log("some error occured in geting movie rating : ", error);
    return error;
  }
}

async function movieRatingGetByID(id) {
  try {
    const [data, fields] = await db.query(
      `select * from movie_rating where RatingID = ${id}`,
    );
    return data[0];
  } catch (error) {
    console.log("some error occured in geting movie rating by id : ", error);
    return error;
  }
}
async function movieRatingInsert(formData) {
  try {
    const [data, fields] = await db.query(
      `insert into movie_rating value ('${formData.RatingID}' , '${formData.MovieID}' , '${formData.UserID}' , '${formData.RatingStar}' , '${formData.RatingComment}')`,
    );
    return data;
  } catch (error) {
    console.log("some error occured in inserting movie rating : ", error);
    return error;
  }
}
async function movieRatingUpdate(id, formData) {
  try {
    const [data, fields] = await db.query(
      `update movie_rating set  RatingStar=${formData.RatingStar} , RatingComment='${formData.RatingComment}' where RatingID = ${id}`,
    );
    return data;
  } catch (error) {
    console.log("some error occured in updating movie rating : ", error);
    return error;
  }
}
async function movieRatingDelete(id) {
  try {
    const [data, fields] = await db.query(
      `delete from movie_rating where RatingID = ${id}`,
    );
    return data;
  } catch (error) {
    console.log("some error occured in deleting movie rating : ", error);
    return error;
  }
}
module.exports = {
  movieRatingDelete,
  movieRatingGetAll,
  movieRatingGetByID,
  movieRatingInsert,
  movieRatingUpdate,
};
