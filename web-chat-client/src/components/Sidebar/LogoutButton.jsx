import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box } from "@mui/material";

const LogoutButton = () => {
  return (
    <Box
      sx={{
        cursor: "pointer",
        height: 50,
        py: 1,
      }}
    >
      <LogoutIcon></LogoutIcon>
    </Box>
  );
};

export default LogoutButton;
