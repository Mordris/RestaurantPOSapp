// src/pages/TablePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Grid } from "@mui/material";
import TableCard from "../components/TableCard";

const TablePage = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tables");
        setTables(response.data);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    fetchTables();
  }, []);

  const handleStatusChange = async (tableId, currentStatus) => {
    const newStatus = currentStatus === "free" ? "busy" : "free";
    try {
      await axios.put(`http://localhost:5000/tables/${tableId}`, {
        status: newStatus,
      });
      setTables((prevTables) =>
        prevTables.map((table) =>
          table._id === tableId ? { ...table, status: newStatus } : table
        )
      );
    } catch (error) {
      console.error("There was an error updating the table status!", error);
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Table Management
      </Typography>
      <Grid container spacing={3}>
        {tables.map((table) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={table._id}>
            <TableCard table={table} onStatusChange={handleStatusChange} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TablePage;
