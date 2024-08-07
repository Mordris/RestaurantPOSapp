import React from "react";
import Navbar from "../components/Navbar"; // Import the Navbar component
import Footer from "../components/Footer"; // Import the Footer component
import { Container } from "@mui/material";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar /> {/* Add the Navbar component */}
      <Container maxWidth="lg" sx={{ my: 4 }}>
        {children}
      </Container>
      <Footer /> {/* Add the Footer component */}
    </>
  );
};

export default MainLayout;
