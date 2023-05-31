const { MongoClient, ObjectId } = require("mongodb");
const Joi = require('joi');

const uri = "mongodb+srv://admin:admin@cluster0.edr434m.mongodb.net/Buildr?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const validateComputer = (computerData) => {
  const schema = Joi.object({
    Computer_Code: Joi.number().required(),
    Computer_Name: Joi.string().max(30).required(),
    computerPrice: Joi.number().required()
  });

  const validationResult = schema.validate(computerData);
  if (validationResult.error) {
    throw new Error("Invalid computer data");
  }
};

const getComputers = async () => {
  try {
    const db = client.db();
    const computers = await db.collection("computer").find().toArray();
    return computers;
  } catch (error) {
    console.error("Computer retrieval error:", error);
    throw new Error("Internal server error");
  }
};

const createComputer = async (computerData) => {
    try {
      validateComputer(computerData);
  
      const db = client.db();
      const computersCollection = db.collection("computer");
  
      const result = await computersCollection.insertOne(computerData);
      const insertedComputerId = result.insertedId;
      const insertedComputer = await computersCollection.findOne({ _id: insertedComputerId });
  
      return insertedComputer;
    } catch (error) {
      console.error("Computer creation error:", error);
      throw new Error("Internal server error");
    }
  };
  

const getComputerById = async (id) => {
  try {
    const db = client.db();
    const computer = await db.collection("computer").findOne({ _id: new ObjectId(id) });
    if (!computer) {
      throw new Error("Computer not found");
    }
    return computer;
  } catch (error) {
    console.error("Computer retrieval error:", error);
    throw new Error("Internal server error");
  }
};

const updateComputer = async (id, computerData) => {
  try {
    validateComputer(computerData);

    const db = client.db();
    const computersCollection = db.collection("computer");

    const updatedComputer = await computersCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: computerData },
      { returnOriginal: false }
    );

    if (!updatedComputer.value) {
      throw new Error("Computer not found");
    }

    return updatedComputer.value;
  } catch (error) {
    console.error("Computer update error:", error);
    if (error.message === "Computer not found") {
      throw new Error("Computer not found");
    } else {
      throw new Error("Internal server error");
    }
  }
};

const deleteComputer = async (id) => {
  try {
    const db = client.db();
    const deletedComputer = await db.collection("computer").findOneAndDelete({ _id: new ObjectId(id) });
    if (!deletedComputer.value) {
      throw new Error("Computer not found");
    }
    return { message: "Computer deleted successfully" };
  } catch (error) {
    console.error("Computer deletion error:", error);
    throw new Error("Internal server error");
  }
};

module.exports = {
  getComputers,
  createComputer,
  getComputerById,
  updateComputer,
  deleteComputer
};
