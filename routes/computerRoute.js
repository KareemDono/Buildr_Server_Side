const ComputerModel = require("../models/computerModel");
const computerRoutes = require('express').Router();

computerRoutes.createComputer = async (req, res) => {
  try {
    const newComputer = await ComputerModel.createComputer(req.body);
    res.status(201).json(newComputer);
  } catch (error) {
    console.error("Computer creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

computerRoutes.getComputers = async (req, res) => {
  try {
    const computers = await ComputerModel.getComputers();
    res.json(computers);
  } catch (error) {
    console.error("Computer retrieval error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

computerRoutes.getComputerById = async (req, res) => {
  try {
    const computer = await ComputerModel.getComputerById(req.params.id);
    res.json(computer);
  } catch (error) {
    console.error("Computer retrieval error:", error);
    if (error.message === "Computer not found") {
      res.status(404).json({ error: "Computer not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

computerRoutes.updateComputer = async (req, res) => {
  try {
    const updatedComputer = await ComputerModel.updateComputer(req.params.id, req.body);
    res.json(updatedComputer);
  } catch (error) {
    console.error("Computer update error:", error);
    if (error.message === "Computer not found") {
      res.status(404).json({ error: "Computer not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

computerRoutes.deleteComputer = async (req, res) => {
  try {
    const result = await ComputerModel.deleteComputer(req.params.id);
    res.json(result);
  } catch (error) {
    console.error("Computer deletion error:", error);
    if (error.message === "Computer not found") {
      res.status(404).json({ error: "Computer not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = computerRoutes;
