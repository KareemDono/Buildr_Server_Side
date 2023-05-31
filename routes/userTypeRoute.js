const UserTypeModel = require("../models/userTypeModel");
const userTypeRoutes = require('express').Router()

userTypeRoutes.createUserType = async (req, res) => {
  try {
    const newUserType = await UserTypeModel.createUserType(req.body);
    res.status(201).json(newUserType);
  } catch (error) {
    console.error("User type creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

userTypeRoutes.getUserTypes = async (req, res) => {
  try {
    const userTypes = await UserTypeModel.getUserTypes();
    res.json(userTypes);
  } catch (error) {
    console.error("User type retrieval error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

userTypeRoutes.getUserTypeById = async (req, res) => {
  try {
    const userType = await UserTypeModel.getUserTypeById(req.params.id);
    res.json(userType);
  } catch (error) {
    console.error("User type retrieval error:", error);
    if (error.message === "User type not found") {
      res.status(404).json({ error: "User type not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

userTypeRoutes.updateUserType = async (req, res) => {
  try {
    const updatedUserType = await UserTypeModel.updateUserType(req.params.id, req.body);
    res.json(updatedUserType);
  } catch (error) {
    console.error("User type update error:", error);
    if (error.message === "User type not found") {
      res.status(404).json({ error: "User type not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

userTypeRoutes.deleteUserType = async (req, res) => {
  try {
    const result = await UserTypeModel.deleteUserType(req.params.id);
    res.json(result);
  } catch (error) {
    console.error("User type deletion error:", error);
    if (error.message === "User type not found") {
      res.status(404).json({ error: "User type not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = userTypeRoutes;
