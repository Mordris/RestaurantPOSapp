import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import TableViewIcon from "@mui/icons-material/TableView";
import HistoryIcon from "@mui/icons-material/History";
import Logo from "../../assets/appLogo.png"; // Adjust the path to your logo file

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <img
        src={Logo}
        alt="DineMaster POS Logo"
        style={{
          width: 40,
          height: 40,
          marginRight: 16,
          filter: "invert(1) brightness(0) invert(1)",
        }}
      />
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        POS System
      </Typography>
      <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />}>
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

export default Navbar;
