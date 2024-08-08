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

const HistoryTable = ({ history, lastElementRef }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Table</TableCell>
            <TableCell>Products</TableCell>
            <TableCell align="right">Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((entry, index) => {
            const isLastElement = history.length === index + 1;
            return (
              <TableRow
                key={entry._id}
                ref={isLastElement ? lastElementRef : null}
              >
                <TableCell>{new Date(entry.date).toLocaleString()}</TableCell>
                <TableCell>{entry.table.name}</TableCell>
                <TableCell>
                  {entry.products
                    .map((p) => `${p.product.name} (${p.quantity})`)
                    .join(", ")}
                </TableCell>
                <TableCell align="right">${entry.price.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;
