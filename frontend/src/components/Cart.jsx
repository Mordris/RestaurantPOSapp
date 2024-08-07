// src/components/Cart.jsx
import React, { useCallback, useState, useEffect } from "react";
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
  const [localTotalPrice, setLocalTotalPrice] = useState(0);

  useEffect(() => {
    setLocalTotalPrice(
      cart.reduce(
        (total, item) => total + (item.product.price || 0) * item.quantity,
        0
      )
    );
  }, [cart]);

  const handleRemove = useCallback(
    (productId) => onRemoveFromCart(productId),
    [onRemoveFromCart]
  );

  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Cart
      </Typography>
      <List>
        {cart.map((item) => (
          <ListItem
            key={item.product._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #e0e0e0",
              paddingY: 1,
            }}
          >
            <Typography variant="body1">
              {item.product.name} (x{item.quantity})
            </Typography>
            <IconButton
              color="error"
              onClick={() => handleRemove(item.product._id)}
              sx={{ marginLeft: 1 }}
            >
              <RemoveIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ marginY: 2 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color="textPrimary">
          Total: $
          {!isNaN(localTotalPrice) ? localTotalPrice.toFixed(2) : "0.00"}
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={onSaveOrder}
            sx={{ marginRight: 1, borderRadius: 1 }}
          >
            Save Order
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={onCompleteOrder}
            sx={{ borderRadius: 1 }}
          >
            Complete Order
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Cart;
