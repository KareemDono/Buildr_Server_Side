const { MongoClient, ObjectId } = require("mongodb");
const Joi = require('joi');

const uri = "mongodb+srv://admin:admin@cluster0.edr434m.mongodb.net/Buildr?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const validateManufacturer = (manufacturerData) => {
  const schema = Joi.object({
    Manufacturer_Code: Joi.number().required(),
    Manufacturer_Name: Joi.string().max(30).required(),
  });

  const validationResult = schema.validate(manufacturerData);
  if (validationResult.error) {
    throw new Error("Invalid manufacturer data");
  }
};

const getManufacturers = async () => {
  try {
    const db = client.db();
    const manufacturers = await db.collection("manufacturer").find().toArray();
    return manufacturers;
  } catch (error) {
    console.error("Manufacturer retrieval error:", error);
    throw new Error("Internal server error");
  }
};

const createManufacturer = async (manufacturerData) => {
    try {
      validateManufacturer(manufacturerData);
  
      const db = client.db();
      const manufacturersCollection = db.collection("manufacturer");
  
      const result = await manufacturersCollection.insertOne(manufacturerData);
      const insertedManufacturerId = result.insertedId;
      const insertedManufacturer = await manufacturersCollection.findOne({ _id: insertedManufacturerId });
  
      return insertedManufacturer;
    } catch (error) {
      console.error("Manufacturer creation error:", error);
      throw new Error("Internal server error");
    }
  };
  

const getManufacturerById = async (id) => {
  try {
    const db = client.db();
    const manufacturer = await db.collection("manufacturer").findOne({ _id: new ObjectId(id) });
    if (!manufacturer) {
      throw new Error("Manufacturer not found");
    }
    return manufacturer;
  } catch (error) {
    console.error("Manufacturer retrieval error:", error);
    throw new Error("Internal server error");
  }
};

const updateManufacturer = async (id, manufacturerData) => {
  try {
    validateManufacturer(manufacturerData);

    const db = client.db();
    const manufacturersCollection = db.collection("manufacturer");

    const updatedManufacturer = await manufacturersCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: manufacturerData },
      { returnOriginal: false }
    );

    if (!updatedManufacturer.value) {
      throw new Error("Manufacturer not found");
    }

    return updatedManufacturer.value;
  } catch (error) {
    console.error("Manufacturer update error:", error);
    if (error.message === "Manufacturer not found") {
      throw new Error("Manufacturer not found");
    } else {
      throw new Error("Internal server error");
    }
  }
};

const deleteManufacturer = async (id) => {
  try {
    const db = client.db();
    const deletedManufacturer = await db.collection("manufacturer").findOneAndDelete({ _id: new ObjectId(id) });
    if (!deletedManufacturer.value) {
      throw new Error("Manufacturer not found");
    }
    return { message: "Manufacturer deleted successfully" };
  } catch (error) {
    console.error("Manufacturer deletion error:", error);
    throw new Error("Internal server error");
  }
};

module.exports = {
  getManufacturers,
  createManufacturer,
  getManufacturerById,
  updateManufacturer,
  deleteManufacturer
};
