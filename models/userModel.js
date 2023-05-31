const { MongoClient, ObjectId } = require("mongodb");
const Joi = require('joi');


const uri = "mongodb+srv://admin:admin@cluster0.edr434m.mongodb.net/Buildr?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const validateUser = (userData) => {
  const schema = Joi.object({
    Id: Joi.number(),
    first_name: Joi.string().max(20).required(),
    last_name: Joi.string().max(50).required(),
    username: Joi.string().max(15).required(),
    email: Joi.string().email().max(60).required(),
    phone_number: Joi.number().required(),
    birth_date: Joi.date().iso().required(),
    city: Joi.string().max(20).required(),
    password: Joi.string().max(25).required(),
    user_type: Joi.string().max(5)
  }); 
  const validationResult = schema.validate(userData);
  if (validationResult.error) {
    throw new Error("Invalid user data");
  }
};


const getUsers = async () => {
  try {
    const db = client.db();
    const users = await db.collection("users").find().toArray();
    return users;
  } catch (error) {
    console.error("User retrieval error:", error);
    throw new Error("Internal server error");
  }
};

const createUser = async (userData) => {
  try {
    validateUser(userData);
    userData.birth_date = new Date(userData.birth_date); // Convert birth_date to a Date object

    // Set user_type field as "user"
    userData.user_type = "user";

    const db = client.db();
    const usersCollection = db.collection("users");

    // Find the last user in the database
    const lastUser = await usersCollection.findOne({}, { sort: { Id: -1 } });

    // Assign the new user's ID based on the presence of existing users
    const newUserId = lastUser ? lastUser.Id + 1 : 0;
    userData.Id = newUserId;

    await usersCollection.insertOne(userData);

    // Retrieve the inserted user
    const insertedUser = await usersCollection.findOne({ Id: newUserId });
    return insertedUser;
  } catch (error) {
    console.error("User creation error:", error);
    throw new Error("Internal server error");
  }
};





const getUserById = async (id) => {
  try {
    const db = client.db();
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("User retrieval error:", error);
    throw new Error("Internal server error");
  }
};

const updateUser = async (id, userData) => {
  try {
    validateUser(userData);
    userData.birth_date = new Date(userData.birth_date); // Convert birth_date to a Date object

    const db = client.db();
    const usersCollection = db.collection("users");

    const updatedUser = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: userData },
      { returnOriginal: false }
    );

    if (!updatedUser.value) {
      throw new Error("User not found");
    }

    return updatedUser.value;
  } catch (error) {
    console.error("User update error:", error);
    if (error.message === "User not found") {
      throw new Error("User not found");
    } else {
      throw new Error("Internal server error");
    }
  }
};


const deleteUser = async (id) => {
  try {
    const db = client.db();
    const deletedUser = await db.collection("users").findOneAndDelete({ _id: new ObjectId(id) });
    if (!deletedUser.value) {
      throw new Error("User not found");
    }
    return { message: "User deleted successfully" };
  } catch (error) {
    console.error("User deletion error:", error);
    throw new Error("Internal server error");
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
