const db = require("../db/mysql");

async function usersGetAll() {
  try {
    const [data, fields] = await db.query(`SELECT * from users`);
    return data;
  } catch (error) {
    console.log("error in get all users :", error);
    return error;
  }
}

async function userGetByID(id) {
  try {
    const [data, fields] = await db.query(
      `SELECT * FROM users WHERE UserID=${id}`,
    );
    return data[0];
  } catch (error) {
    return false;
  }
}

async function userInsert(formData) {
  try {
    const [data, fields] = await db.query(
      `INSERT INTO users VALUES ('NULL' , '${formData.UserName}' , '${formData.Password}')`,
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function userGetByUserName(un) {
  try {
    const [data, fields] = await db.query(
      `SELECT * FROM users WHERE UserName ='${un}'`,
    );
    // console.log(data)
    return data[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function userUpdate(id, formData) {
  try {
    const [data, fields] = await db.query(
      `UPDATE users set userName= '${formData.UserName}' , PassWord= '${formData.Password}' where UserID=${id}`,
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function userDeleteById(id) {
  try {
    const [data, fields] = await db.query(
      `DELETE FROM users where userID=${id}`,
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
module.exports = {
  usersGetAll,
  userUpdate,
  userDeleteById,
  userGetByUserName,
  userInsert,
  userGetByID,
};
