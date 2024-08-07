import React from "react";
import { Grid } from "@mui/material";
import ProductGrid from "../ProductGrid";
import Cart from "../Cart";

const OrderContent = ({
  products,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onSaveOrder,
  onCompleteOrder,
}) => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={8}>
      <ProductGrid products={products} onAddToCart={onAddToCart} />
    </Grid>
    <Grid item xs={12} md={4}>
      <Cart
        cart={cart}
        onRemoveFromCart={onRemoveFromCart}
        totalPrice={cart.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )}
        onSaveOrder={onSaveOrder}
        onCompleteOrder={onCompleteOrder}
      />
    </Grid>
  </Grid>
);

export default OrderContent;
