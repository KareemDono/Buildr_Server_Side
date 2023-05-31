const OrderModel = require("../models/orderModel");
const orderRoutes = require('express').Router();

orderRoutes.createOrder = async (req, res) => {
  try {
    const newOrder = await OrderModel.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

orderRoutes.getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.getOrders();
    res.json(orders);
  } catch (error) {
    console.error("Order retrieval error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

orderRoutes.getOrderById = async (req, res) => {
  try {
    const order = await OrderModel.getOrderById(req.params.id);
    res.json(order);
  } catch (error) {
    console.error("Order retrieval error:", error);
    if (error.message === "Order not found") {
      res.status(404).json({ error: "Order not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

orderRoutes.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await OrderModel.updateOrder(req.params.id, req.body);
    res.json(updatedOrder);
  } catch (error) {
    console.error("Order update error:", error);
    if (error.message === "Order not found") {
      res.status(404).json({ error: "Order not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

orderRoutes.deleteOrder = async (req, res) => {
  try {
    const result = await OrderModel.deleteOrder(req.params.id);
    res.json(result);
  } catch (error) {
    console.error("Order deletion error:", error);
    if (error.message === "Order not found") {
      res.status(404).json({ error: "Order not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = orderRoutes;
