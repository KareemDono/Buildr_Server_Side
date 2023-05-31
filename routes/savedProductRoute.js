const SavedProductModel = require("../models/savedProductModel");
const savedProductRoutes = require('express').Router()

savedProductRoutes.createSavedProduct = async (req, res) => {
  try {
    const newSavedProduct = await SavedProductModel.createSavedProduct(req.body);
    res.status(201).json(newSavedProduct);
  } catch (error) {
    console.error("Saved product creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

savedProductRoutes.getSavedProducts = async (req, res) => {
  try {
    const savedProducts = await SavedProductModel.getSavedProducts();
    res.json(savedProducts);
  } catch (error) {
    console.error("Saved product retrieval error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

savedProductRoutes.getSavedProductById = async (req, res) => {
  try {
    const savedProduct = await SavedProductModel.getSavedProductById(req.params.id);
    res.json(savedProduct);
  } catch (error) {
    console.error("Saved product retrieval error:", error);
    if (error.message === "Saved product not found") {
      res.status(404).json({ error: "Saved product not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

savedProductRoutes.updateSavedProduct = async (req, res) => {
  try {
    const updatedSavedProduct = await SavedProductModel.updateSavedProduct(req.params.id, req.body);
    res.json(updatedSavedProduct);
  } catch (error) {
    console.error("Saved product update error:", error);
    if (error.message === "Saved product not found") {
      res.status(404).json({ error: "Saved product not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

savedProductRoutes.deleteSavedProduct = async (req, res) => {
  try {
    const result = await SavedProductModel.deleteSavedProduct(req.params.id);
    res.json(result);
  } catch (error) {
    console.error("Saved product deletion error:", error);
    if (error.message === "Saved product not found") {
      res.status(404).json({ error: "Saved product not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = savedProductRoutes;
