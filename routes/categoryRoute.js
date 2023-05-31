const CategoryModel = require("../models/categoryModel");
const categoryRoutes = require('express').Router();

categoryRoutes.createCategory = async (req, res) => {
  try {
    const newCategory = await CategoryModel.createCategory(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Category creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

categoryRoutes.getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.getCategories();
    res.json(categories);
  } catch (error) {
    console.error("Category retrieval error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

categoryRoutes.getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.getCategoryById(req.params.id);
    res.json(category);
  } catch (error) {
    console.error("Category retrieval error:", error);
    if (error.message === "Category not found") {
      res.status(404).json({ error: "Category not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

categoryRoutes.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await CategoryModel.updateCategory(req.params.id, req.body);
    res.json(updatedCategory);
  } catch (error) {
    console.error("Category update error:", error);
    if (error.message === "Category not found") {
      res.status(404).json({ error: "Category not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

categoryRoutes.deleteCategory = async (req, res) => {
  try {
    const result = await CategoryModel.deleteCategory(req.params.id);
    res.json(result);
  } catch (error) {
    console.error("Category deletion error:", error);
    if (error.message === "Category not found") {
      res.status(404).json({ error: "Category not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = categoryRoutes;
