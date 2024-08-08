const express = require("express");
const router = express.Router();
const { History } = require("../db");

// Route to get all history data at once
router.get("/", async (req, res) => {
  try {
    // Fetch all history entries, populate the necessary fields
    const history = await History.find()
      .populate("table", "name")
      .populate("products.product", "name");

    // Sort the history data by date (newest first by default)
    history.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({ history });
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
