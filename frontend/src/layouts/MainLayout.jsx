import React from "react";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import { Box } from "@mui/material";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar /> {/* Add the Navbar component */}
      <Box sx={{ flexGrow: 1, px: { xs: 2, sm: 4 }, py: 4 }}>{children}</Box>
      <Footer /> {/* Add the Footer component */}
    </>
  );
};

export default MainLayout;
