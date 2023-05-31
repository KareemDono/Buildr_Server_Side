const { MongoClient, ObjectId } = require("mongodb");
const Joi = require('joi');

const uri = "mongodb+srv://admin:admin@cluster0.edr434m.mongodb.net/Buildr?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const validateSavedProduct = (productData) => {
  const schema = Joi.object({
    UPC_Code: Joi.string().max(50).required(),
    Product_Name: Joi.string().max(50).required(),
    Product_Picture: Joi.string().required(),
    Description: Joi.string().max(40).required(),
    Catagory_Code: Joi.number().integer().required(),
    Manufacturer_Code: Joi.number().integer().required(),
    savedProductPrice: Joi.number().required()
  });

  const validationResult = schema.validate(productData);
  if (validationResult.error) {
    throw new Error("Invalid saved product data");
  }
};

const getSavedProducts = async () => {
  try {
    const db = client.db();
    const savedProducts = await db.collection("saved_products").find().toArray();
    return savedProducts;
  } catch (error) {
    console.error("Saved product retrieval error:", error);
    throw new Error("Internal server error");
  }
};

const createSavedProduct = async (productData) => {
  try {
    validateSavedProduct(productData);

    const db = client.db();
    const savedProductsCollection = db.collection("saved_products");

    await savedProductsCollection.insertOne(productData);

    return productData;
  } catch (error) {
    console.error("Saved product creation error:", error);
    throw new Error("Internal server error");
  }
};

const getSavedProductById = async (id) => {
  try {
    const db = client.db();
    const savedProduct = await db.collection("saved_products").findOne({ _id: new ObjectId(id) });
    if (!savedProduct) {
      throw new Error("Saved product not found");
    }
    return savedProduct;
  } catch (error) {
    console.error("Saved product retrieval error:", error);
    throw new Error("Internal server error");
  }
};

const updateSavedProduct = async (id, productData) => {
  try {
    validateSavedProduct(productData);

    const db = client.db();
    const savedProductsCollection = db.collection("saved_products");

    const updatedSavedProduct = await savedProductsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: productData },
      { returnOriginal: false }
    );

    if (!updatedSavedProduct.value) {
      throw new Error("Saved product not found");
    }

    return updatedSavedProduct.value;
  } catch (error) {
    console.error("Saved product update error:", error);
    if (error.message === "Saved product not found") {
      throw new Error("Saved product not found");
    } else {
      throw new Error("Internal server error");
    }
  }
};

const deleteSavedProduct = async (id) => {
  try {
    const db = client.db();
    const deletedSavedProduct = await db.collection("saved_products").findOneAndDelete({ _id: new ObjectId(id) });
    if (!deletedSavedProduct.value) {
      throw new Error("Saved product not found");
    }
    return { message: "Saved product deleted successfully" };
  } catch (error) {
    console.error("Saved product deletion error:", error);
    throw new Error("Internal server error");
  }
};

module.exports = {
  getSavedProducts,
  createSavedProduct,
  getSavedProductById,
  updateSavedProduct,
  deleteSavedProduct
};
