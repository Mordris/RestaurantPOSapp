import React from 'react';
import { Button, Typography, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

function HomePage() {
  return (
    <MainLayout>
      <Container>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" textAlign="center">
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to RestaPOS
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            Efficiently manage your sales with our Point of Sale system.
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/pos">
            Go to POS
          </Button>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default HomePage;
