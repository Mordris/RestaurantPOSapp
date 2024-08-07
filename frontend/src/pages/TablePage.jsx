import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Chip,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const TablePage = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tables")
      .then((response) => setTables(response.data))
      .catch((error) => console.error("Error fetching table data:", error));
  }, []);

  const handleStatusChange = (tableId, currentStatus) => {
    const newStatus = currentStatus === "free" ? "busy" : "free";
    axios
      .put(`http://localhost:5000/tables/${tableId}`, { status: newStatus })
      .then(() => {
        setTables(
          tables.map((table) =>
            table._id === tableId ? { ...table, status: newStatus } : table
          )
        );
      })
      .catch((error) => {
        console.error("There was an error updating the table status!", error);
      });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Table Management
      </Typography>
      <Grid container spacing={3}>
        {tables.map((table) => (
          <Grid item xs={12} sm={6} md={4} key={table._id}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                {table.name}
              </Typography>
              <Chip
                label={
                  table.status.charAt(0).toUpperCase() + table.status.slice(1)
                }
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
                  onClick={() => handleStatusChange(table._id, table.status)}
                >
                  {table.status === "free" ? "Mark as Busy" : "Mark as Free"}
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TablePage;
