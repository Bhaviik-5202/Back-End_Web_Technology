// services/usersService.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersModel = require("../models/usersModel");

const usersService = {
  getAllUsers: async () => {
    try {
      const users = await usersModel.getAllUsers();
      return {
        error: false,
        data: users,
        message: "Users fetched successfully",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },

  getUserById: async (id) => {
    try {
      const user = await usersModel.getUserById(id);
      if (!user) {
        return {
          error: true,
          message: "User not found",
        };
      }
      return {
        error: false,
        data: user,
        message: "User fetched successfully",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },

  registerUser: async (userData) => {
    try {
      const existingUser = await usersModel.getUserByUsername(
        userData.username,
      );
      if (existingUser) {
        return {
          error: true,
          message: "Username already exists",
        };
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const result = await usersModel.createUser(
        userData.username,
        hashedPassword,
      );

      return {
        error: false,
        data: { user_id: result.insertId, username: userData.username },
        message: "User registered successfully",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },

  loginUser: async (username, password) => {
    try {
      const user = await usersModel.getUserByUsername(username);
      if (!user) {
        return {
          error: true,
          message: "Invalid username or password",
        };
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return {
          error: true,
          message: "Invalid username or password",
        };
      }

      const token = jwt.sign(
        { user_id: user.user_id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
      );

      delete user.password;

      return {
        error: false,
        data: {
          user,
          token,
        },
        message: "Login successful",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },

  updateUser: async (id, userData) => {
    try {
      const existingUser = await usersModel.getUserById(id);
      if (!existingUser) {
        return {
          error: true,
          message: "User not found",
        };
      }

      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }

      const result = await usersModel.updateUser(id, userData);

      return {
        error: false,
        data: { affectedRows: result.affectedRows },
        message: "User updated successfully",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },

  deleteUser: async (id) => {
    try {
      const existingUser = await usersModel.getUserById(id);
      if (!existingUser) {
        return {
          error: true,
          message: "User not found",
        };
      }

      const result = await usersModel.deleteUser(id);

      return {
        error: false,
        data: { affectedRows: result.affectedRows },
        message: "User deleted successfully",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },
};

module.exports = usersService;
