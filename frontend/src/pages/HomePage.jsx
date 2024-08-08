import React from "react";
import { Button, Typography, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <Box
      className="home-page-background" // Apply the background class here
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 64px)", // Adjusting height considering Navbar height
        bgcolor: "transparent", // Override default bgcolor
        px: { xs: 2, sm: 4 },
        py: 4,
      }}
    >
      <Typography variant="h3" gutterBottom>
        <span className="headingSpan">Welcome to the POS System</span>
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        <span className="headingSpan">
          Manage your restaurant efficiently with easy access to tables and
          order history.
        </span>
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 3,
              bgcolor: "#fff",
              boxShadow: 3,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Tables
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/tables")}
              sx={{ mt: 2 }}
            >
              Go to Tables
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 3,
              bgcolor: "#fff",
              boxShadow: 3,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              History
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate("/history")}
              sx={{ mt: 2 }}
            >
              Go to History
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
