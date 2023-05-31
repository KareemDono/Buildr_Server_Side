const { MongoClient, ObjectId } = require("mongodb");
const Joi = require('joi');

const uri = "mongodb+srv://admin:admin@cluster0.edr434m.mongodb.net/Buildr?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const validateCategory = (categoryData) => {
    const schema = Joi.object({
      Catagory_Code: Joi.number().required(),
      Catagory_Name: Joi.string().max(30).required(),
    });
  
    const validationResult = schema.validate(categoryData);
    if (validationResult.error) {
      throw new Error("Invalid category data");
    }
  };
  

const getCategories = async () => {
  try {
    const db = client.db();
    const categories = await db.collection("category").find().toArray();
    return categories;
  } catch (error) {
    console.error("Category retrieval error:", error);
    throw new Error("Internal server error");
  }
};

const createCategory = async (categoryData) => {
    try {
      validateCategory(categoryData);
  
      const db = client.db();
      const categoriesCollection = db.collection("category");
  
      const result = await categoriesCollection.insertOne(categoryData);
      const insertedCategoryId = result.insertedId;
      const insertedCategory = await categoriesCollection.findOne({ _id: insertedCategoryId });
  
      return insertedCategory;
    } catch (error) {
      console.error("Category creation error:", error);
      throw new Error("Internal server error");
    }
  };
  
  
  
const getCategoryById = async (id) => {
  try {
    const db = client.db();
    const category = await db.collection("category").findOne({ _id: new ObjectId(id) });
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  } catch (error) {
    console.error("Category retrieval error:", error);
    throw new Error("Internal server error");
  }
};

const updateCategory = async (id, categoryData) => {
  try {
    validateCategory(categoryData);

    const db = client.db();
    const categoriesCollection = db.collection("category");

    const updatedCategory = await categoriesCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: categoryData },
      { returnOriginal: false }
    );

    if (!updatedCategory.value) {
      throw new Error("Category not found");
    }

    return updatedCategory.value;
  } catch (error) {
    console.error("Category update error:", error);
    if (error.message === "Category not found") {
      throw new Error("Category not found");
    } else {
      throw new Error("Internal server error");
    }
  }
};

const deleteCategory = async (id) => {
  try {
    const db = client.db();
    const deletedCategory = await db.collection("category").findOneAndDelete({ _id: new ObjectId(id) });
    if (!deletedCategory.value) {
      throw new Error("Category not found");
    }
    return { message: "Category deleted successfully" };
  } catch (error) {
    console.error("Category deletion error:", error);
    throw new Error("Internal server error");
  }
};

module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
};
