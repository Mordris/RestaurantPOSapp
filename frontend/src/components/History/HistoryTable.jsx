import React, { memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const HistoryTable = memo(({ filteredHistory }) => {
  const formatDate = (date) => new Intl.DateTimeFormat('en-US').format(new Date(date));

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
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
              <TableCell>${entry.price.toFixed(2)}</TableCell>
              <TableCell>{formatDate(entry.date)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default HistoryTable;
