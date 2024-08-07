// src/server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // For loading environment variables
const { Product, Table, Order, History } = require("./db"); // Import History

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Routes

// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all tables
app.get("/tables", async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific table
app.get("/tables/:tableId", async (req, res) => {
  try {
    const table = await Table.findById(req.params.tableId);
    if (!table) return res.status(404).json({ message: "Table not found" });
    res.json(table);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update table status
app.put("/tables/:tableId", async (req, res) => {
  try {
    const { status } = req.body;
    const table = await Table.findByIdAndUpdate(
      req.params.tableId,
      { status },
      { new: true }
    );
    res.json(table);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get orders for a specific table
app.get("/orders/table/:tableId", async (req, res) => {
  try {
    const orders = await Order.find({
      table: req.params.tableId,
      completed: false,
    })
      .populate("table")
      .populate("products.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create or update an order for a specific table
app.post("/orders", async (req, res) => {
  try {
    const { table: tableId, products, price } = req.body;

    // Validate the table
    const table = await Table.findById(tableId);
    if (!table) return res.status(404).json({ message: "Table not found" });

    // Validate products
    const productIds = products.map((p) => p.product);
    const existingProducts = await Product.find({ _id: { $in: productIds } });
    if (existingProducts.length !== products.length)
      return res
        .status(404)
        .json({ message: "One or more products not found" });

    // Check if there's an existing order for this table
    let order = await Order.findOne({ table: tableId, completed: false });

    if (order) {
      // Update the existing order
      order.products = products;
      order.price = price;
      await order.save();
    } else {
      // Create a new order
      order = new Order({
        table: tableId,
        products,
        price,
      });
      await order.save();
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Complete an order, save it to history, and clear the table
app.post("/orders/:orderId/complete", async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find and update the order to completed
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Save to history
    const historyEntry = new History({
      table: order.table,
      products: order.products,
      price: order.price,
    });
    await historyEntry.save();

    // Clear the order for the table
    await Order.deleteMany({ table: order.table, completed: false });
    await Table.findByIdAndUpdate(order.table, { currentPrice: 0 });

    res.status(200).json({ message: "Order completed and saved to history" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get order history
app.get("/orders/history", async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;

    let historyQuery = History.find()
      .populate("table")
      .populate("products.product");

    if (search) {
      historyQuery = historyQuery
        .where("products.product.name")
        .regex(new RegExp(search, "i"));
    }

    const history = await historyQuery
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .exec();
    const totalCount = await History.countDocuments();

    res.status(200).json({ history, totalCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
