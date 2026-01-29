// models/usersModel.js
const db = require("../db/connection");

const usersModel = {
  getAllUsers: async () => {
    try {
      const [rows] = await db.query(
        "SELECT user_id, username, created_at FROM users",
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      const [rows] = await db.query(
        "SELECT user_id, username, created_at FROM users WHERE user_id = ?",
        [id],
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  getUserByUsername: async (username) => {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
        username,
      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  createUser: async (username, password) => {
    try {
      const [result] = await db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, password],
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    try {
      const [result] = await db.query(
        "UPDATE users SET username = ?, password = ? WHERE user_id = ?",
        [userData.username, userData.password, id],
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const [result] = await db.query("DELETE FROM users WHERE user_id = ?", [
        id,
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = usersModel;
