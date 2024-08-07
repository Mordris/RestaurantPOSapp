// src/components/SearchAndSort.jsx
import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const SearchAndSort = ({ search, sort, onSearchChange, onSortChange }) => {
  return (
    <>
      <TextField
        label="Search by product name"
        value={search}
        onChange={onSearchChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel sx={{ marginTop: -1 }}>Sort By</InputLabel>
        <Select value={sort} onChange={onSortChange}>
          <MenuItem value="newest">Newest to Oldest</MenuItem>
          <MenuItem value="oldest">Oldest to Newest</MenuItem>
          <MenuItem value="expensive">Most Expensive to Cheapest</MenuItem>
          <MenuItem value="cheapest">Cheapest to Most Expensive</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default SearchAndSort;
