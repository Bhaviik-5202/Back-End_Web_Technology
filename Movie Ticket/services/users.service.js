const {
  usersGetAll,
  userUpdate,
  userDeleteById,
  userGetByUserName,
  userInsert,
  userGetByID,
} = require("../models/users.model");
const jwt = require("jsonwebtoken");

async function getAllUsers() {
  const data = await usersGetAll();
  if (data) {
    return {
      error: false,
      data,
      massage: "user fetched success",
    };
  } else {
    return {
      error: true,
      massage: "some error occured",
    };
  }
}

async function getUserByID(id) {
  const data = await userGetByID(id);
  if (data) {
    return {
      error: false,
      data,
      massage: "user fetched success",
    };
  } else {
    return {
      error: true,
      massage: "some error occured",
    };
  }
}

async function userCheckLogin(formData) {
  const data = await userGetByUserName(formData.UserName);
  if (data) {
    var token = jwt.sign(data, "shhhhh");
    if (data.UserName === formData.UserName) {
      return {
        error: false,
        data: token,
        massage: "user fetched success",
      };
    } else {
      return {
        error: true,
        massage: "username or password incorrect",
      };
    }
  } else {
    return {
      error: true,
      massage: "username or password incorrect",
    };
  }
}

async function insertUser(formData) {
  const data = await userInsert(formData);
  if (data) {
    return {
      error: false,
      data,
      massage: "user fetched success",
    };
  } else {
    return {
      error: true,
      massage: "some error occured",
    };
  }
}

async function updateUser(id, formData) {
  const data = await userUpdate(id, formData);
  if (data) {
    return {
      error: false,
      data,
      massage: "user fetched success",
    };
  } else {
    return {
      error: true,
      massage: "some error occured",
    };
  }
}

async function deleteUser(id) {
  const data = await userDeleteById(id);
  if (data) {
    return {
      error: false,
      data,
      massage: "user fetched success",
    };
  } else {
    return {
      error: true,
      massage: "some error occured",
    };
  }
}
module.exports = {
  getAllUsers,
  getUserByID,
  updateUser,
  insertUser,
  deleteUser,
  userCheckLogin,
};
