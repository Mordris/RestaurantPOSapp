// src/components/TableCard.jsx
import React from "react";
import { Paper, Typography, Button, Chip, Box } from "@mui/material";
import { Link } from "react-router-dom";

const TableCard = ({ table, onStatusChange }) => {
  return (
    <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        {table.name}
      </Typography>
      <Chip
        label={table.status.charAt(0).toUpperCase() + table.status.slice(1)}
        color={table.status === "free" ? "success" : "error"}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Box sx={{ mb: 2 }}>
        <Button
          component={Link}
          to={`/orders/${table._id}`}
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
        >
          View Orders
        </Button>
        <Button
          variant="contained"
          color={table.status === "free" ? "success" : "error"}
          onClick={() => onStatusChange(table._id, table.status)}
        >
          {table.status === "free" ? "Mark as Busy" : "Mark as Free"}
        </Button>
      </Box>
    </Paper>
  );
};

export default TableCard;
