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

// Add "/api/" prefix to all routes
app.use("/api/users", userRoutes);
app.get("/api/users", userRoutes.getUsers);
app.post("/api/users", userRoutes.createUser);
app.get("/api/users/:id", userRoutes.getUserById);
app.put("/api/users/:id", userRoutes.updateUser);
app.delete("/api/users/:id", userRoutes.deleteUser);

app.use("/api/products", productRoutes);
app.get("/api/products", productRoutes.getProducts);
app.post("/api/products", productRoutes.createProduct);
app.get("/api/products/:id", productRoutes.getProductById);
app.put("/api/products/:id", productRoutes.updateProduct);
app.delete("/api/products/:id", productRoutes.deleteProduct);

app.use("/api/saved-products", savedProductRoutes);
app.get("/api/saved-products", savedProductRoutes.getSavedProducts);
app.post("/api/saved-products", savedProductRoutes.createSavedProduct);
app.get("/api/saved-products/:id", savedProductRoutes.getSavedProductById);
app.put("/api/saved-products/:id", savedProductRoutes.updateSavedProduct);
app.delete("/api/saved-products/:id", savedProductRoutes.deleteSavedProduct);

app.use("/api/user-types", userTypeRoutes);
app.get("/api/user-types", userTypeRoutes.getUserTypes);
app.post("/api/user-types", userTypeRoutes.createUserType);
app.get("/api/user-types/:id", userTypeRoutes.getUserTypeById);
app.put("/api/user-types/:id", userTypeRoutes.updateUserType);
app.delete("/api/user-types/:id", userTypeRoutes.deleteUserType);

app.use("/api/orders", orderRoutes);
app.get("/api/orders", orderRoutes.getOrders);
app.post("/api/orders", orderRoutes.createOrder);
app.get("/api/orders/:id", orderRoutes.getOrderById);
app.put("/api/orders/:id", orderRoutes.updateOrder);
app.delete("/api/orders/:id", orderRoutes.deleteOrder);

app.use("/api/manufacturer", manufacturerRoutes);
app.get("/api/manufacturer", manufacturerRoutes.getManufacturers);
app.post("/api/manufacturer", manufacturerRoutes.createManufacturer);
app.get("/api/manufacturer/:id", manufacturerRoutes.getManufacturerById);
app.put("/api/manufacturer/:id", manufacturerRoutes.updateManufacturer);
app.delete("/api/manufacturer/:id", manufacturerRoutes.deleteManufacturer);

app.use("/api/computer", computerRoutes);
app.get("/api/computer", computerRoutes.getComputers);
app.post("/api/computer", computerRoutes.createComputer);
app.get("/api/computer/:id", computerRoutes.getComputerById);
app.put("/api/computer/:id", computerRoutes.updateComputer);
app.delete("/api/computer/:id", computerRoutes.deleteComputer);

app.use("/api/category", categoryRoutes);
app.get("/api/category", categoryRoutes.getCategories);
app.post("/api/category", categoryRoutes.createCategory);
app.get("/api/category/:id", categoryRoutes.getCategoryById);
app.put("/api/category/:id", categoryRoutes.updateCategory);
app.delete("/api/category/:id", categoryRoutes.deleteCategory);

app.use("/api/computer-type", computerTypeRoutes);
app.get("/api/computer-type", computerTypeRoutes.getComputerTypes);
app.post("/api/computer-type", computerTypeRoutes.createComputerType);
app.get("/api/computer-type/:id", computerTypeRoutes.getComputerTypeById);
app.put("/api/computer-type/:id", computerTypeRoutes.updateComputerType);
app.delete("/api/computer-type/:id", computerTypeRoutes.deleteComputerType);

app.use("/api", (req, res) => {
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
