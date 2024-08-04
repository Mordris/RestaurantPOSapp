import React, { useState, useRef } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';
import ProductCard from '../components/ProductCard';
import CartTable from '../components/CartTable';
import { Grid, Button, Box, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const ProductGrid = styled(Box)(({ theme }) => ({
  flex: '1 1 70%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  [theme.breakpoints.down('md')]: {
    flex: '1 1 100%',
  },
}));

const CartSidebar = styled(Box)(({ theme }) => ({
  flex: '1 1 30%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const CartBottomBar = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    boxShadow: '0px -2px 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
  },
}));

function POSPage() {
  const { products, isLoading } = useProducts();
  const { cart, totalAmount, addProductToCart, removeProductFromCart, setCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <Container>
        <ProductGrid>
          <TextField
            fullWidth
            label="Search Products"
            variant="outlined"
            margin="normal"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {isLoading && <Typography>Loading...</Typography>}
          <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid item xs={6} sm={4} md={4} lg={3} xl={2} key={product.id}>
                <ProductCard product={product} onAddToCart={addProductToCart} />
              </Grid>
            ))}
          </Grid>
        </ProductGrid>
        <CartSidebar>
          <Box display="none">
            <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef} />
          </Box>
          <CartTable cart={cart} totalAmount={totalAmount} onRemoveProduct={removeProductFromCart} />
          <Box mt={3}>
            {totalAmount > 0 ? (
              <Box>
                <Button variant="contained" color="primary" onClick={handlePrint} style={{ marginRight: '1rem' }}>
                  Checkout
                </Button>
                <Button variant="contained" color="error" onClick={() => setCart([])}>
                  Clear Cart
                </Button>
              </Box>
            ) : (
              'Please add a product to the cart'
            )}
          </Box>
        </CartSidebar>
      </Container>
      <CartBottomBar>
        <CartTable cart={cart} totalAmount={totalAmount} onRemoveProduct={removeProductFromCart} />
        <Box mt={3} p={2}>
          {totalAmount > 0 ? (
            <Box>
              <Button variant="contained" color="primary" onClick={handlePrint} style={{ marginRight: '1rem' }}>
                Checkout
              </Button>
              <Button variant="contained" color="error" onClick={() => setCart([])}>
                Clear Cart
              </Button>
            </Box>
          ) : (
            'Please add a product to the cart'
          )}
        </Box>
      </CartBottomBar>
    </MainLayout>
  );
}

export default POSPage;
