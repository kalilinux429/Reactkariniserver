const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/product");
require("dotenv").config(); // Load environment variables from .env

const app = express();

// Allow CORS for all origins
app.use(cors());  // This will allow all domains to access your API

app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB (updated without deprecated options)
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Routes
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
