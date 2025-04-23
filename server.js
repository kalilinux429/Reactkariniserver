

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
// Route to get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Chat query endpoint
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  // Check if the message is about SKU or price
  try {
    let products;

    // Search by SKU (e.g., "Find SKU 12345")
    const skuMatch = message.match(/sku (\d+)/i);
    if (skuMatch) {
      const sku = skuMatch[1];
      products = await Product.find({ 'Variant SKU': sku });
    } 
    // Search by price (e.g., "Show electronics under $50")
    else if (message.toLowerCase().includes("under $")) {
      const priceMatch = message.match(/under \$(\d+)/i);
      const maxPrice = priceMatch ? parseFloat(priceMatch[1]) : 0;
      products = await Product.find({ 'Variant Price': { $lte: maxPrice } });
    }
    else {
      // Default search by title or SKU (case insensitive)
      products = await Product.find({
        $or: [
          { Title: { $regex: message, $options: 'i' } },
          { 'Variant SKU': { $regex: message, $options: 'i' } },
        ]
      });
    }

    if (products.length === 0) {
      return res.json({ message: 'No products found based on your query.' });
    }

    res.json(products);
  } catch (err) {
    console.error("Error processing query:", err);
    res.status(500).json({ message: 'Server error' });
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
