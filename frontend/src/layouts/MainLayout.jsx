// src/components/Layout/MainLayout.jsx
import React from "react";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import { Box } from "@mui/material";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1, px: { xs: 2, sm: 4 }, py: 4 }}>
        {children}
      </Box>{" "}
      <Footer />
    </>
  );
};

export default MainLayout;
