const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/product");
const data = require("./products/data.json");
require("dotenv").config(); // Load environment variables from .env

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log(" MongoDB connected"))
  .catch(err => console.error(" MongoDB error:", err));

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

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
