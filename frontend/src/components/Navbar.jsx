import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import TableViewIcon from "@mui/icons-material/TableView";
import HistoryIcon from "@mui/icons-material/History";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          POS System
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/"
          startIcon={<HomeIcon />}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/tables"
          startIcon={<TableViewIcon />}
        >
          Tables
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/history"
          startIcon={<HistoryIcon />}
        >
          History
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
