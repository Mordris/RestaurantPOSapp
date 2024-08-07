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
        setError("Failed to load history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

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

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

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
        <HistoryTable filteredHistory={filteredHistory} />
      </Paper>
    </Box>
  );
};

export default HistoryPage;