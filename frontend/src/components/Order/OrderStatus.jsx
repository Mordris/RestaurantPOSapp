// src/components/Order/OrderStatus.jsx
import React from "react";
import { Button, Box } from "@mui/material";

const OrderStatus = ({ status, onChange }) => {
  const handleToggle = () => {
    onChange(status === "free" ? "busy" : "free");
  };

  return (
    <Box>
      <Button
        variant="contained"
        color={status === "free" ? "success" : "error"}
        onClick={handleToggle}
      >
        {status === "free" ? "Mark as Busy" : "Mark as Free"}
      </Button>
    </Box>
  );
};

export default OrderStatus;
