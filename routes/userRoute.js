const UserModel = require("../models/userModel");
const userRoutes = require('express').Router()

userRoutes.createUser = async (req, res) => {
  try {
    const newUser = await UserModel.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("User creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


userRoutes.getUsers = async (req, res) => {
  try {
    const users = await UserModel.getUsers();
    res.json(users);
  } catch (error) {
    console.error("User retrieval error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

userRoutes.getUserById = async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    console.error("User retrieval error:", error);
    if (error.message === "User not found") {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

userRoutes.updateUser = async (req, res) => {
  try {
    const updatedUser = await UserModel.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    console.error("User update error:", error);
    if (error.message === "User not found") {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

userRoutes.deleteUser = async (req, res) => {
  try {
    const result = await UserModel.deleteUser(req.params.id);
    res.json(result);
  } catch (error) {
    console.error("User deletion error:", error);
    if (error.message === "User not found") {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = userRoutes;