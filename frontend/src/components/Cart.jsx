import React, { useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = ({
  cart,
  onRemoveFromCart,
  totalPrice,
  onSaveOrder,
  onCompleteOrder,
}) => {
  const [localTotalPrice, setLocalTotalPrice] = React.useState(0);

  useEffect(() => {
    // Calculate the total price whenever the cart changes
    const newTotalPrice = cart.reduce(
      (total, item) => total + (item.product.price || 0) * item.quantity,
      0
    );
    setLocalTotalPrice(newTotalPrice);
  }, [cart]);

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6">Cart</Typography>
      <List>
        {cart.map((item) => (
          <ListItem
            key={item.product._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>
              {item.product.name} (x{item.quantity})
            </Typography>
            <IconButton onClick={() => onRemoveFromCart(item.product._id)}>
              <RemoveIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
      >
        <Typography variant="h6">
          Total: $
          {!isNaN(localTotalPrice) ? localTotalPrice.toFixed(2) : "0.00"}
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={onSaveOrder}
            sx={{ marginRight: 1 }}
          >
            Save Order
          </Button>
          <Button variant="contained" color="success" onClick={onCompleteOrder}>
            Complete Order
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Cart;
