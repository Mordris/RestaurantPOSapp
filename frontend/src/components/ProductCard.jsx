import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

function ProductCard({ product, onAddToCart }) {
  return (
    <Card sx={{maxWidth: 345, marginBottom: 2, cursor: 'pointer' }} onClick={() => onAddToCart(product)}>
      <CardMedia
        component="img"
        height="150"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
