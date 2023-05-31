const ManufacturerModel = require("../models/manufacturerModel");
const manufacturerRoutes = require('express').Router();

manufacturerRoutes.createManufacturer = async (req, res) => {
  try {
    const newManufacturer = await ManufacturerModel.createManufacturer(req.body);
    res.status(201).json(newManufacturer);
  } catch (error) {
    console.error("Manufacturer creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

manufacturerRoutes.getManufacturers = async (req, res) => {
  try {
    const manufacturers = await ManufacturerModel.getManufacturers();
    res.json(manufacturers);
  } catch (error) {
    console.error("Manufacturer retrieval error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

manufacturerRoutes.getManufacturerById = async (req, res) => {
  try {
    const manufacturer = await ManufacturerModel.getManufacturerById(req.params.id);
    res.json(manufacturer);
  } catch (error) {
    console.error("Manufacturer retrieval error:", error);
    if (error.message === "Manufacturer not found") {
      res.status(404).json({ error: "Manufacturer not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

manufacturerRoutes.updateManufacturer = async (req, res) => {
  try {
    const updatedManufacturer = await ManufacturerModel.updateManufacturer(req.params.id, req.body);
    res.json(updatedManufacturer);
  } catch (error) {
    console.error("Manufacturer update error:", error);
    if (error.message === "Manufacturer not found") {
      res.status(404).json({ error: "Manufacturer not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

manufacturerRoutes.deleteManufacturer = async (req, res) => {
  try {
    const result = await ManufacturerModel.deleteManufacturer(req.params.id);
    res.json(result);
  } catch (error) {
    console.error("Manufacturer deletion error:", error);
    if (error.message === "Manufacturer not found") {
      res.status(404).json({ error: "Manufacturer not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = manufacturerRoutes;
