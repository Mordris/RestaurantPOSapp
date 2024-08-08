// src/components/Layout/Footer.jsx
import React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        bgcolor:
          theme.palette.mode === "light"
            ? theme.palette.grey[900]
            : theme.palette.grey[200],
        color:
          theme.palette.mode === "light"
            ? theme.palette.common.white
            : theme.palette.common.black,
        background:
          theme.palette.mode === "light"
            ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
            : `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url('https://www.transparenttextures.com/patterns/black-linen.png')`,
          opacity: 0.1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" sx={{ fontWeight: 500 }}>
          Thank you for visiting!
        </Typography>
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} POS System. All rights reserved.
        </Typography>
        <Typography variant="caption" align="center" sx={{ mt: 1 }}>
          Developed by Yunus Emre Gültepe
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
