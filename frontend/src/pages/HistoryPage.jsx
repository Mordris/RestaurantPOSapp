import React, { useEffect, useState, useCallback } from "react";
import {
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  // Function to load history data
  const loadHistory = async (page) => {
    setLoading(true);
    try {
      const data = await fetchHistory(page);
      if (data && Array.isArray(data.history)) {
        setHistory(data.history);
        setTotalPages(data.totalPages);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      setError("Failed to load history.");
    } finally {
      setLoading(false);
    }
  };

  // Load history when page changes
  useEffect(() => {
    loadHistory(page);
  }, [page]);

  // Filter and sort history whenever `search`, `sort`, or `history` changes
  useEffect(() => {
    filterAndSortHistory();
  }, [search, sort, filterAndSortHistory, page]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1); // Reset page to 1 when sort changes
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          siblingCount={1} // Optional: Adjust as needed
          boundaryCount={1} // Optional: Adjust as needed
        />
      </Box>
    </Box>
  );
};

export default HistoryPage;
