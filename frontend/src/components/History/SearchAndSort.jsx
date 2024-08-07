import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const SearchAndSort = ({ search, sort, onSearchChange, onSortChange }) => (
  <>
    <TextField
      label="Search by product name"
      value={search}
      onChange={onSearchChange}
      fullWidth
      margin="normal"
      error={!search && search !== ""}
      helperText={!search && search !== "" ? "Search field cannot be empty" : ""}
    />
    <FormControl fullWidth margin="normal">
      <InputLabel sx={{marginTop: -1}}>Sort By</InputLabel>
      <Select value={sort} onChange={onSortChange}>
        <MenuItem value="newest">Newest to Oldest</MenuItem>
        <MenuItem value="oldest">Oldest to Newest</MenuItem>
        <MenuItem value="expensive">Most Expensive to Cheapest</MenuItem>
        <MenuItem value="cheapest">Cheapest to Most Expensive</MenuItem>
      </Select>
    </FormControl>
  </>
);

export default SearchAndSort;
