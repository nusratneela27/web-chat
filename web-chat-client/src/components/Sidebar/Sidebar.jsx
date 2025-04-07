import React from "react";
import SearchInput from "../Sidebar/SearchInput";
import Conversations from "../Sidebar/Conversations";
import LogoutButton from "../Sidebar/LogoutButton";
import { Box, Divider } from "@mui/material";

const Sidebar = () => {
  return (
    <Box
      sx={{
        borderRight: "1px solid #90a4ae",
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        
      }}
    >
      <SearchInput />

      <Divider sx={{ my: 2 }} />

      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <Conversations />
      </Box>

      <LogoutButton />
    </Box>
  );
};

export default Sidebar;
