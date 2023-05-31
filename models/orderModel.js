const { MongoClient, ObjectId } = require("mongodb");
const Joi = require('joi');

const uri = "mongodb+srv://admin:admin@cluster0.edr434m.mongodb.net/Buildr?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const validateOrder = (orderData) => {
  const schema = Joi.object({
    Order_Id: Joi.number().integer().required(),
    Order_Name: Joi.string().max(40).required(),
    Id: Joi.number().integer().required(),
    orderPrice: Joi.number().required()
  });

  const validationResult = schema.validate(orderData);
  if (validationResult.error) {
    throw new Error("Invalid order data");
  }
};

const getOrders = async () => {
  try {
    const db = client.db();
    const orders = await db.collection("orders").find().toArray();
    return orders;
  } catch (error) {
    console.error("Order retrieval error:", error);
    throw new Error("Internal server error");
  }
};

const createOrder = async (orderData) => {
  try {
    validateOrder(orderData);

    const db = client.db();
    const ordersCollection = db.collection("orders");

    await ordersCollection.insertOne(orderData);

    return orderData;
  } catch (error) {
    console.error("Order creation error:", error);
    throw new Error("Internal server error");
  }
};

const getOrderById = async (id) => {
  try {
    const db = client.db();
    const order = await db.collection("orders").findOne({ _id: new ObjectId(id) });
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  } catch (error) {
    console.error("Order retrieval error:", error);
    throw new Error("Internal server error");
  }
};

const updateOrder = async (id, orderData) => {
  try {
    validateOrder(orderData);

    const db = client.db();
    const ordersCollection = db.collection("orders");

    const updatedOrder = await ordersCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: orderData },
      { returnOriginal: false }
    );

    if (!updatedOrder.value) {
      throw new Error("Order not found");
    }

    return updatedOrder.value;
  } catch (error) {
    console.error("Order update error:", error);
    if (error.message === "Order not found") {
      throw new Error("Order not found");
    } else {
      throw new Error("Internal server error");
    }
  }
};

const deleteOrder = async (id) => {
  try {
    const db = client.db();
    const deletedOrder = await db.collection("orders").findOneAndDelete({ _id: new ObjectId(id) });
    if (!deletedOrder.value) {
      throw new Error("Order not found");
    }
    return { message: "Order deleted successfully" };
  } catch (error) {
    console.error("Order deletion error:", error);
    throw new Error("Internal server error");
  }
};

module.exports = {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder
};
