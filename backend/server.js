const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connection"); // Import MongoDB connection

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
const productRoutes = require("./routes/products");
const tableRoutes = require("./routes/tables");
const orderRoutes = require("./routes/orders");

app.use("/products", productRoutes);
app.use("/tables", tableRoutes);
app.use("/orders", orderRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
