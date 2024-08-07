// src/pages/HistoryPage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import axios from "axios";
import SearchAndSort from "../components/SearchAndSort";
import HistoryTable from "../components/HistoryTable";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  // Fetch history data once when component mounts
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/orders/history"
        );
        if (Array.isArray(response.data.history)) {
          setHistory(response.data.history);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  // Filter and sort history based on search and sort criteria
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

      setFilteredHistory(filtered);
    },
    [history]
  );

  useEffect(() => {
    filterAndSortHistory(search, sort);
  }, [search, sort, filterAndSortHistory]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Order History
      </Typography>
      <Box sx={{ marginBottom: 4 }}>
        <SearchAndSort
          search={search}
          sort={sort}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
        />
      </Box>
      <Paper sx={{ padding: 2 }}>
        <HistoryTable filteredHistory={filteredHistory} />
      </Paper>
    </Container>
  );
};

export default HistoryPage;
