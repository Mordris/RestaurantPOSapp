// src/components/HistoryTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const HistoryTable = ({ filteredHistory }) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Table ID</TableCell>
            <TableCell>Products</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredHistory.map((entry) => (
            <TableRow key={entry._id}>
              <TableCell>{entry._id}</TableCell>
              <TableCell>{entry.table.name}</TableCell>
              <TableCell>
                {entry.products
                  .map((p) => `${p.product.name} (x${p.quantity})`)
                  .join(", ")}
              </TableCell>
              <TableCell>${entry.price}</TableCell>
              <TableCell>{new Date(entry.date).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;
