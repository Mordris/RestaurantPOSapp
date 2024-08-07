import React from "react";
import { TextField } from "@mui/material";

const ProductSearch = ({ search, onSearchChange }) => (
  <TextField
    variant="outlined"
    label="Search Products"
    fullWidth
    value={search}
    onChange={onSearchChange}
    sx={{ marginBottom: 2 }}
  />
);

export default ProductSearch;
