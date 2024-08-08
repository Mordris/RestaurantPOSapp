import React, { useEffect, useState, useCallback } from "react";
import { Typography, Box, Paper, CircularProgress, Alert } from "@mui/material";
import { fetchHistory } from "../api";
import SearchAndSort from "../components/History/SearchAndSort";
import HistoryTable from "../components/History/HistoryTable";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to filter and sort history
  const filterAndSortHistory = useCallback(() => {
    let filtered = history.filter((entry) => {
      return (
        entry.products &&
        entry.products.some((p) =>
          p.product.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    });

    switch (sort) {
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
  }, [history, search, sort]);

  // Fetch history data from the server
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const { history: fetchedHistory } = await fetchHistory();
        setHistory(fetchedHistory);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch history");
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  useEffect(() => {
    filterAndSortHistory();
  }, [search, sort, filterAndSortHistory]);

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const handleSortChange = (value) => {
    setSort(value);
  };

  return (
    <Box className="history-page-background" sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        <span className="headingSpan">Order History</span>
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <SearchAndSort
          search={search}
          onSearchChange={handleSearchChange}
          sort={sort}
          onSortChange={handleSortChange}
        />
      </Paper>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <HistoryTable history={filteredHistory} />
      )}
    </Box>
  );
};

export default HistoryPage;
