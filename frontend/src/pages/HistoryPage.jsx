// src/pages/HistoryPage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Typography, Box, Paper, CircularProgress, Alert } from "@mui/material";
import axios from "axios";
import SearchAndSort from "../components/History/SearchAndSort";
import HistoryTable from "../components/History/HistoryTable";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch order history from the server when the component mounts
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/orders/history"
        );
        if (Array.isArray(response.data.history)) {
          setHistory(response.data.history); // Store the history data
        } else {
          console.error("Unexpected data format:", response.data); // Log unexpected data format
        }
      } catch (error) {
        console.error("Error fetching history:", error); // Log error if fetching fails
        setError("Failed to load history."); // Set error state for UI
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchHistory();
  }, []);

  // Filter and sort the order history based on search and sort options
  const filterAndSortHistory = useCallback(
    (searchTerm, sortOption) => {
      let filtered = history.filter((entry) => {
        return (
          entry.products &&
          entry.products.some((p) =>
            p.product.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      });

      // Sort the filtered history based on the selected option
      switch (sortOption) {
        case "newest":
          filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "oldest":
          filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case "expensive":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "cheapest":
          filtered.sort((a, b) => a.price - b.price);
          break;
        default:
          break;
      }

      setFilteredHistory(filtered); // Update the state with the filtered and sorted history
    },
    [history]
  );

  // Update filtered and sorted history whenever search or sort options change
  useEffect(() => {
    filterAndSortHistory(search, sort);
  }, [search, sort, filterAndSortHistory]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value); // Update search term
  };

  const handleSortChange = (e) => {
    setSort(e.target.value); // Update sort option
  };

  if (loading) return <CircularProgress />; // Show loading indicator
  if (error) return <Alert severity="error">{error}</Alert>; // Show error message

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Order History
      </Typography>
      <Box sx={{ mb: 4 }}>
        <SearchAndSort
          search={search}
          sort={sort}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
        />
      </Box>
      <Paper sx={{ p: 2 }}>
        <HistoryTable filteredHistory={filteredHistory} />{" "}
        {/* Display the filtered and sorted history */}
      </Paper>
    </Box>
  );
};

export default HistoryPage;
