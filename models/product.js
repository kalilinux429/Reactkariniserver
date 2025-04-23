const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  Handle: String,
  Title: String,
  Body: String,
  Vendor: String,
  Type: String,
  Tags: String,
  Option1Name: String,
  Option1Value: String,
  Option2Name: String,
  Option2Value: String,
  Option3Name: String,
  Option3Value: String,
  VariantSKU: String,
  VariantGrams: Number,
  VariantInventoryTracker: String,
  VariantInventoryQty: Number,
  VariantInventoryPolicy: String,
  VariantFulfillmentService: String,
  VariantPrice: Number,
  VariantCompareAtPrice: String,
  ImageSrc: String,
});

module.exports = mongoose.model("Product", productSchema);
