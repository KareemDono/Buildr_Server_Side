const { MongoClient, ObjectId } = require("mongodb");
const Joi = require('joi');

const uri = "mongodb+srv://admin:admin@cluster0.edr434m.mongodb.net/Buildr?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const validateUserType = (userTypeData) => {
  const schema = Joi.object({
    user_type: Joi.string().max(20).required()
  });

  const validationResult = schema.validate(userTypeData);
  if (validationResult.error) {
    throw new Error("Invalid user type data");
  }
};

const getUserTypes = async () => {
  try {
    const db = client.db();
    const userTypes = await db.collection("user_type").find().toArray();
    return userTypes;
  } catch (error) {
    console.error("User type retrieval error:", error);
    throw new Error("Internal server error");
  }
};

const createUserType = async (userTypeData) => {
  try {
    validateUserType(userTypeData);

    const db = client.db();
    const userTypesCollection = db.collection("user_type");

    await userTypesCollection.insertOne(userTypeData);

    return userTypeData;
  } catch (error) {
    console.error("User type creation error:", error);
    throw new Error("Internal server error");
  }
};

const getUserTypeById = async (id) => {
  try {
    const db = client.db();
    const userType = await db.collection("user_type").findOne({ _id: new ObjectId(id) });
    if (!userType) {
      throw new Error("User type not found");
    }
    return userType;
  } catch (error) {
    console.error("User type retrieval error:", error);
    throw new Error("Internal server error");
  }
};

const updateUserType = async (id, userTypeData) => {
  try {
    validateUserType(userTypeData);

    const db = client.db();
    const userTypesCollection = db.collection("user_type");

    const updatedUserType = await userTypesCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: userTypeData },
      { returnOriginal: false }
    );

    if (!updatedUserType.value) {
      throw new Error("User type not found");
    }

    return updatedUserType.value;
  } catch (error) {
    console.error("User type update error:", error);
    if (error.message === "User type not found") {
      throw new Error("User type not found");
    } else {
      throw new Error("Internal server error");
    }
  }
};

const deleteUserType = async (id) => {
  try {
    const db = client.db();
    const deletedUserType = await db.collection("user_type").findOneAndDelete({ _id: new ObjectId(id) });
    if (!deletedUserType.value) {
      throw new Error("User type not found");
    }
    return { message: "User type deleted successfully" };
  } catch (error) {
    console.error("User type deletion error:", error);
    throw new Error("Internal server error");
  }
};

module.exports = {
  getUserTypes,
  createUserType,
  getUserTypeById,
  updateUserType,
  deleteUserType
};
