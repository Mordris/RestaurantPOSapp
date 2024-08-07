const express = require("express");
const router = express.Router();
const { Table } = require("../db");

// Get all tables
router.get("/", async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific table
router.get("/:tableId", async (req, res) => {
  try {
    const table = await Table.findById(req.params.tableId);
    if (!table) return res.status(404).json({ message: "Table not found" });
    res.json(table);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update table status
router.put("/:tableId", async (req, res) => {
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

module.exports = router;
