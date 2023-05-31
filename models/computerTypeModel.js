const { MongoClient, ObjectId } = require("mongodb");
const Joi = require('joi');

const uri = "mongodb+srv://admin:admin@cluster0.edr434m.mongodb.net/Buildr?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const validateComputerType = (computerTypeData) => {
  const schema = Joi.object({
    Computer_Code: Joi.number().required(),
    Gaming: Joi.string().max(30).required(),
    Office: Joi.string().max(30).required(),
    Graphic: Joi.string().max(30).required(),
  });

  const validationResult = schema.validate(computerTypeData);
  if (validationResult.error) {
    throw new Error("Invalid computer type data");
  }
};

const getComputerTypes = async () => {
  try {
    const db = client.db();
    const computerTypes = await db.collection("computer_type").find().toArray();
    return computerTypes;
  } catch (error) {
    console.error("Computer type retrieval error:", error);
    throw new Error("Internal server error");
  }
};

const createComputerType = async (computerTypeData) => {
    try {
      validateComputerType(computerTypeData);
  
      const db = client.db();
      const computerTypesCollection = db.collection("computer_type");
  
      const result = await computerTypesCollection.insertOne(computerTypeData);
      const insertedComputerTypeId = result.insertedId;
      const insertedComputerType = await computerTypesCollection.findOne({ _id: insertedComputerTypeId });
  
      return insertedComputerType;
    } catch (error) {
      console.error("Computer type creation error:", error);
      throw new Error("Internal server error");
    }
  };
  

const getComputerTypeById = async (id) => {
  try {
    const db = client.db();
    const computerType = await db.collection("computer_type").findOne({ _id: new ObjectId(id) });
    if (!computerType) {
      throw new Error("Computer type not found");
    }
    return computerType;
  } catch (error) {
    console.error("Computer type retrieval error:", error);
    throw new Error("Internal server error");
  }
};

const updateComputerType = async (id, computerTypeData) => {
  try {
    validateComputerType(computerTypeData);

    const db = client.db();
    const computerTypesCollection = db.collection("computer_type");

    const updatedComputerType = await computerTypesCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: computerTypeData },
      { returnOriginal: false }
    );

    if (!updatedComputerType.value) {
      throw new Error("Computer type not found");
    }

    return updatedComputerType.value;
  } catch (error) {
    console.error("Computer type update error:", error);
    if (error.message === "Computer type not found") {
      throw new Error("Computer type not found");
    } else {
      throw new Error("Internal server error");
    }
  }
};

const deleteComputerType = async (id) => {
  try {
    const db = client.db();
    const deletedComputerType = await db.collection("computer_type").findOneAndDelete({ _id: new ObjectId(id) });
    if (!deletedComputerType.value) {
      throw new Error("Computer type not found");
    }
    return { message: "Computer type deleted successfully" };
  } catch (error) {
    console.error("Computer type deletion error:", error);
    throw new Error("Internal server error");
  }
};

module.exports = {
  getComputerTypes,
  createComputerType,
  getComputerTypeById,
  updateComputerType,
  deleteComputerType
};
