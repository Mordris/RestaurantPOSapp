const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const tableSchema = new mongoose.Schema({
  name: String,
  status: String,
  number: Number, // Add a number field for table number
});

const orderSchema = new mongoose.Schema({
  table: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  price: Number,
  completed: { type: Boolean, default: false },
});

const historySchema = new mongoose.Schema({
  table: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  price: Number,
  date: { type: Date, default: Date.now },
});

// Create indexes
historySchema.index({ "products.product.name": 1 });
historySchema.index({ date: -1 });

const Product = mongoose.model("Product", productSchema);
const Table = mongoose.model("Table", tableSchema);
const Order = mongoose.model("Order", orderSchema);
const History = mongoose.model("History", historySchema);

module.exports = { Product, Table, Order, History };
