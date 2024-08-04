import React from "react";
import { AppBar, Toolbar, Typography, Container, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainLayout({ children }) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            RestaPOS
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xxl" >{children}</Container>
      <ToastContainer />
    </div>
  );
}

export default MainLayout;
