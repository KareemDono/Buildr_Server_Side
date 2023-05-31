const ComputerTypeModel = require("../models/computerTypeModel");
const computerTypeRoutes = require('express').Router();

computerTypeRoutes.createComputerType = async (req, res) => {
  try {
    const newComputerType = await ComputerTypeModel.createComputerType(req.body);
    res.status(201).json(newComputerType);
  } catch (error) {
    console.error("Computer type creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

computerTypeRoutes.getComputerTypes = async (req, res) => {
  try {
    const computerTypes = await ComputerTypeModel.getComputerTypes();
    res.json(computerTypes);
  } catch (error) {
    console.error("Computer type retrieval error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

computerTypeRoutes.getComputerTypeById = async (req, res) => {
  try {
    const computerType = await ComputerTypeModel.getComputerTypeById(req.params.id);
    res.json(computerType);
  } catch (error) {
    console.error("Computer type retrieval error:", error);
    if (error.message === "Computer type not found") {
      res.status(404).json({ error: "Computer type not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

computerTypeRoutes.updateComputerType = async (req, res) => {
  try {
    const updatedComputerType = await ComputerTypeModel.updateComputerType(req.params.id, req.body);
    res.json(updatedComputerType);
  } catch (error) {
    console.error("Computer type update error:", error);
    if (error.message === "Computer type not found") {
      res.status(404).json({ error: "Computer type not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

computerTypeRoutes.deleteComputerType = async (req, res) => {
  try {
    const result = await ComputerTypeModel.deleteComputerType(req.params.id);
    res.json(result);
  } catch (error) {
    console.error("Computer type deletion error:", error);
    if (error.message === "Computer type not found") {
      res.status(404).json({ error: "Computer type not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = computerTypeRoutes;
