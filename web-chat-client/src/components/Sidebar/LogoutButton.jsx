import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, CircularProgress } from "@mui/material";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <Box
      sx={{
        cursor: "pointer",
        // height: 50,
        pt: 2,
      }}
    >
      {!loading ? (
        <LogoutIcon onClick={logout} sx={{ fontSize: 30 }}></LogoutIcon>
      ) : (
        <CircularProgress size={24} color="inherit" />
      )}
    </Box>
  );
};

export default LogoutButton;
