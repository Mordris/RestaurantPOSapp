import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '10px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  fontSize: '0.8rem',
  fontWeight: 'bold',
}));

// Define column widths
const columnStyles = {
  name: { width: '25%' },
  price: { width: '15%' },
  quantity: { width: '20%' },
  total: { width: '20%' },
  action: { width: '25%' },
};

function CartTable({ cart, totalAmount, onRemoveProduct }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ tableLayout: 'auto' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={columnStyles.name}>Name</StyledTableCell>
            <StyledTableCell style={columnStyles.price}>Price</StyledTableCell>
            <StyledTableCell style={columnStyles.quantity}>Quantity</StyledTableCell>
            <StyledTableCell style={columnStyles.total}>Total</StyledTableCell>
            <StyledTableCell style={columnStyles.action}>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell style={columnStyles.name}>{item.name}</StyledTableCell>
              <StyledTableCell style={columnStyles.price}>${item.price}</StyledTableCell>
              <StyledTableCell style={columnStyles.quantity}>{item.quantity}</StyledTableCell>
              <StyledTableCell style={columnStyles.total}>${item.totalAmount}</StyledTableCell>
              <StyledTableCell style={columnStyles.action}>
                <StyledButton variant="contained" color="error" onClick={() => onRemoveProduct(item)}>
                  Remove
                </StyledButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
          <StyledTableRow>
            <StyledTableCell colSpan={3}>
              <strong>Total</strong>
            </StyledTableCell>
            <StyledTableCell colSpan={2}>
              <strong>${totalAmount}</strong>
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CartTable;
