const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const userRoutes = require("./routes/userRoute");
const userTypeRoutes = require("./routes/userTypeRoute");
const productRoutes = require("./routes/productRoute");
const savedProductRoutes = require("./routes/savedProductRoute");
const orderRoutes = require("./routes/orderRoute");
const manufacturerRoutes = require("./routes/manufacturerRoute");
const computerRoutes = require("./routes/computerRoute");
const computerTypeRoutes = require("./routes/computerTypeRoute");
const categoryRoutes = require("./routes/categoryRoute");

const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.edr434m.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//users
app.use("/users", userRoutes);
app.get("/users", userRoutes.getUsers);
app.post("/users", userRoutes.createUser);
app.get("/users/:id", userRoutes.getUserById);
app.put("/users/:id", userRoutes.updateUser);
app.delete("/users/:id", userRoutes.deleteUser);

//products
app.use("/products", productRoutes);
app.get("/products", productRoutes.getProducts);
app.post("/products", productRoutes.createProduct);
app.get("/products/:id", productRoutes.getProductById);
app.put("/products/:id", productRoutes.updateProduct);
app.delete("/products/:id", productRoutes.deleteProduct);

//saved products
app.use("/saved-products", savedProductRoutes);
app.get("/saved-products", savedProductRoutes.getSavedProducts);
app.post("/saved-products", savedProductRoutes.createSavedProduct);
app.get("/saved-products/:id", savedProductRoutes.getSavedProductById);
app.put("/saved-products/:id", savedProductRoutes.updateSavedProduct);
app.delete("/saved-products/:id", savedProductRoutes.deleteSavedProduct);

//user type
app.use("/user-types", userTypeRoutes);
app.get("/user-types", userTypeRoutes.getUserTypes);
app.post("/user-types", userTypeRoutes.createUserType);
app.get("/user-types/:id", userTypeRoutes.getUserTypeById);
app.put("/user-types/:id", userTypeRoutes.updateUserType);
app.delete("/user-types/:id", userTypeRoutes.deleteUserType);

//orders
app.use("/orders", orderRoutes);
app.get("/orders", orderRoutes.getOrders);
app.post("/orders", orderRoutes.createOrder);
app.get("/orders/:id", orderRoutes.getOrderById);
app.put("/orders/:id", orderRoutes.updateOrder);
app.delete("/orders/:id", orderRoutes.deleteOrder);

//manufacturers
app.use("/manufacturer", manufacturerRoutes);
app.get("/manufacturer", manufacturerRoutes.getManufacturers);
app.post("/manufacturer", manufacturerRoutes.createManufacturer);
app.get("/manufacturer/:id", manufacturerRoutes.getManufacturerById);
app.put("/manufacturer/:id", manufacturerRoutes.updateManufacturer);
app.delete("/manufacturer/:id", manufacturerRoutes.deleteManufacturer);

//computer
app.use("/computer", computerRoutes);
app.get("/computer", computerRoutes.getComputers);
app.post("/computer", computerRoutes.createComputer);
app.get("/computer/:id", computerRoutes.getComputerById);
app.put("/computer/:id", computerRoutes.updateComputer);
app.delete("/computer/:id", computerRoutes.deleteComputer);

//category
app.use("/category", categoryRoutes);
app.get("/category", categoryRoutes.getCategories);
app.post("/category", categoryRoutes.createCategory);
app.get("/category/:id", categoryRoutes.getCategoryById);
app.put("/category/:id", categoryRoutes.updateCategory);
app.delete("/category/:id", categoryRoutes.deleteCategory);

//computer type
app.use("/computer-type", computerTypeRoutes);
app.get("/computer-type", computerTypeRoutes.getComputerTypes);
app.post("/computer-type", computerTypeRoutes.createComputerType);
app.get("/computer-type/:id", computerTypeRoutes.getComputerTypeById);
app.put("/computer-type/:id", computerTypeRoutes.updateComputerType);
app.delete("/computer-type/:id", computerTypeRoutes.deleteComputerType);

app.use("/", (req, res) => {
  res.send('Welcome to the server');
});

const startServer = async () => {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Start the server
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

startServer();
