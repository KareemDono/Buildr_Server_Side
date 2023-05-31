const ProductModel = require("../models/productModel");
const productRoutes = require('express').Router()

productRoutes.createProduct = async (req, res) => {
  try {
    const newProduct = await ProductModel.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Product creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

productRoutes.getProducts = async (req, res) => {
  try {
    const products = await ProductModel.getProducts();
    res.json(products);
  } catch (error) {
    console.error("Product retrieval error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

productRoutes.getProductById = async (req, res) => {
  try {
    const product = await ProductModel.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    console.error("Product retrieval error:", error);
    if (error.message === "Product not found") {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

productRoutes.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductModel.updateProduct(req.params.id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    console.error("Product update error:", error);
    if (error.message === "Product not found") {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

productRoutes.deleteProduct = async (req, res) => {
  try {
    const result = await ProductModel.deleteProduct(req.params.id);
    res.json(result);
  } catch (error) {
    console.error("Product deletion error:", error);
    if (error.message === "Product not found") {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = productRoutes;
