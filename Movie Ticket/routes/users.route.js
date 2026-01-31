const express = require("express");
const {
  getAllUsers,
  getUserByID,
  insertUser,
  updateUser,
  deleteUser,
  userCheckLogin,
} = require("../services/users.service");
const { userMiddleware } = require("../middlewares/user.middleware");
const routeUser = express.Router();

routeUser.use(userMiddleware);
// get all
routeUser.get("/", async (req, res) => {
  const data = await getAllUsers();
  res.send(data);
});

// get by id
routeUser.get("/:id", async (req, res) => {
  const data = await getUserByID(req.params.id);
  res.send(data);
});

// Login
routeUser.post("/login", async (req, res) => {
  const data = await userCheckLogin(req.body);
  res.send(data);
});
// insert
routeUser.post("/", async (req, res) => {
  const data = await insertUser(req.body);
  res.send(data);
});

// edit
routeUser.put("/:id", async (req, res) => {
  const data = await updateUser(req.params.id, req.body);
  res.send(data);
});

// delete
routeUser.delete("/:id", async (req, res) => {
  const data = await deleteUser(req.params.id);
  res.send(data);
});

module.exports = routeUser;
