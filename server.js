const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/Product");
const data = require("./products/data.json");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;
const MONGO_URI = "mongodb+srv://User2025:Vipasna123@cluster0.vtfeg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // or your MongoDB Atlas URI

// Connect to MongoDB without deprecated options
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));



// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
