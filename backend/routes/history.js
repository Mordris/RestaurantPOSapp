const express = require("express");
const router = express.Router();
const { History } = require("../db");

// Route to get paginated history
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const history = await History.find()
      .skip(skip)
      .limit(limit)
      .populate("table", "name")
      .populate("products.product", "name");

    const totalCount = await History.countDocuments();

    res.json({
      history,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
