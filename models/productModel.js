const { MongoClient, ObjectId } = require("mongodb");
const Joi = require('joi');

const uri = "mongodb+srv://admin:admin@cluster0.edr434m.mongodb.net/Buildr?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const validateProduct = (productData) => {
  const schema = Joi.object({
    UPC_Code: Joi.string().max(50).required(),
    Product_Name: Joi.string().max(50).required(),
    Product_Picture: Joi.string().required(),
    Description: Joi.string().max(40).required(),
    Computer_Code: Joi.number().integer().required(),
    Computer_Name: Joi.string().max(30).required(),
    Catagory_Code: Joi.number().integer().required(),
    Manufacturer_Code: Joi.number().integer().required(),
    productPrice: Joi.number().required()
  });

  const validationResult = schema.validate(productData);
  if (validationResult.error) {
    throw new Error("Invalid product data");
  }
};

const getProducts = async () => {
  try {
    const db = client.db();
    const products = await db.collection("products").find().toArray();
    return products;
  } catch (error) {
    console.error("Product retrieval error:", error);
    throw new Error("Internal server error");
  }
};

const createProduct = async (productData) => {
  try {
    validateProduct(productData);

    const db = client.db();
    const productsCollection = db.collection("products");

    await productsCollection.insertOne(productData);

    return productData;
  } catch (error) {
    console.error("Product creation error:", error);
    throw new Error("Internal server error");
  }
};

const getProductById = async (id) => {
  try {
    const db = client.db();
    const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    console.error("Product retrieval error:", error);
    throw new Error("Internal server error");
  }
};

const updateProduct = async (id, productData) => {
  try {
    validateProduct(productData);

    const db = client.db();
    const productsCollection = db.collection("products");

    const updatedProduct = await productsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: productData },
      { returnOriginal: false }
    );

    if (!updatedProduct.value) {
      throw new Error("Product not found");
    }

    return updatedProduct.value;
  } catch (error) {
    console.error("Product update error:", error);
    if (error.message === "Product not found") {
      throw new Error("Product not found");
    } else {
      throw new Error("Internal server error");
    }
  }
};

const deleteProduct = async (id) => {
  try {
    const db = client.db();
    const deletedProduct = await db.collection("products").findOneAndDelete({ _id: new ObjectId(id) });
    if (!deletedProduct.value) {
      throw new Error("Product not found");
    }
    return { message: "Product deleted successfully" };
  } catch (error) {
    console.error("Product deletion error:", error);
    throw new Error("Internal server error");
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
};
