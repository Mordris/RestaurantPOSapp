import React from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const SearchAndSort = ({ search, onSearchChange, sort, onSortChange }) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <TextField
        label="Search by Product"
        variant="outlined"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ width: "60%" }}
      />

      <FormControl variant="outlined" sx={{ width: "30%" }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sort} onChange={(e) => onSortChange(e.target.value)}>
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
          <MenuItem value="expensive">Most Expensive</MenuItem>
          <MenuItem value="cheapest">Least Expensive</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchAndSort;
