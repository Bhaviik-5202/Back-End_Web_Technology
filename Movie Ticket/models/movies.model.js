const db = require("../db/mysql");

async function movieGetAll() {
  try {
    const [data, fields] = await db.query(`SELECT * FROM movies`);
    return data;
  } catch (error) {
    console.log("some error accured in get all movies : ", error);
    return error;
  }
}

async function movieGetByID(id) {
  try {
    const [data, fields] = await db.query(
      `select * from movies where movieID = ${id}`,
    );
    return data[0];
  } catch (error) {
    console.log("some error accured in get By id Movie :", error);
    return error;
  }
}

async function movieInsert(formData) {
  try {
    const [data, fields] = await db.query(
      `insert into movies values ('NULL' , '${formData.MovieName}' , '${formData.MovieImage}')`,
    );
    return data;
  } catch (error) {
    console.log("some error accured in insert Movie :", error);
    return error;
  }
}

async function movieUpdate(id, formData) {
  try {
    const [data, fields] = await db.query(
      `update movies set MovieName = '${formData.MovieName}' , MovieImage = '${formData.MovieImage}' where movieID = ${id}`,
    );
    return data;
  } catch (error) {
    console.log("some error accured in update Movie :", error);
    return error;
  }
}

async function movieDelete(id) {
  try {
    const [data, fields] = await db.query(
      `delete from movies where movieID = ${id}`,
    );
    return data;
  } catch (error) {
    console.log("some error accured in try to delete Movie :", error);
    return error;
  }
}

module.exports = {
  movieDelete,
  movieUpdate,
  movieInsert,
  movieGetByID,
  movieGetAll,
};
