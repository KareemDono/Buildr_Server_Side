const express = require("express");
const { MongoClient } = require("mongodb");
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

// Define your routes
app.use("/", (req, res) => {
  res.send('Welcome to the server');
});

// Use the routes
app.use("/users", userRoutes);
app.use("/user-types", userTypeRoutes);
app.use("/products", productRoutes);
app.use("/saved-products", savedProductRoutes);
app.use("/orders", orderRoutes);
app.use("/manufacturer", manufacturerRoutes);
app.use("/computer", computerRoutes);
app.use("/computer-type", computerTypeRoutes);
app.use("/category", categoryRoutes);

// ... MongoDB connection code

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.edr434m.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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
