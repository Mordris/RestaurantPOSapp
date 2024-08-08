// src/components/TableCard.jsx
import React from "react";
import { Paper, Typography, Button, Chip, Box } from "@mui/material";
import { Link } from "react-router-dom";

const TableCard = ({ table, onStatusChange }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2, // Make the card smaller by reducing padding
        textAlign: "center",
        maxWidth: 300, // Set a maximum width for the card
        margin: "auto", // Center align cards if there's extra space
      }}
    >
      <Typography variant="h6" gutterBottom>
        {table.name}
      </Typography>
      <Chip
        label={table.status.charAt(0).toUpperCase() + table.status.slice(1)}
        color={table.status === "free" ? "success" : "error"}
        variant="outlined"
        sx={{
          mb: 2,
          fontSize: "1.2rem", // Make the status text a bit larger
          padding: "8px 16px", // Increase padding for a larger chip
        }}
      />
      <Box sx={{ mb: 2 }}>
        <Button
          component={Link}
          to={`/orders/${table._id}`}
          variant="contained"
          color="primary"
          sx={{
            mr: 2,
            fontSize: "1rem",
            padding: "10px 20px",
            minWidth: "150px",
          }}
        >
          View Orders
        </Button>
        <Button
          variant="contained"
          color={table.status === "free" ? "success" : "error"}
          onClick={() => onStatusChange(table._id, table.status)}
          sx={{
            fontSize: "1rem",
            padding: "10px 20px",
            minWidth: "150px",
          }}
        >
          {table.status === "free" ? "Mark as Busy" : "Mark as Free"}
        </Button>
      </Box>
    </Paper>
  );
};

export default TableCard;
