import React from "react";
import { Button } from "@mui/material";

const StatusToggle = ({ status, onStatusChange }) => {
  return (
    <Button
      variant="contained"
      color={status === "free" ? "success" : "error"}
      onClick={onStatusChange}
    >
      {status === "free" ? "Mark as Busy" : "Mark as Free"}
    </Button>
  );
};

export default StatusToggle;
