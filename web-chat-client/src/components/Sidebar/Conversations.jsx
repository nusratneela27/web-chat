import React from "react";
import Conversation from "./Conversation";
import { Box } from "@mui/material";

const Conversations = () => {
  return (
    <Box
      sx={{
        py: 2,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        gap: 1,
      }}
    >
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </Box>
  );
};

export default Conversations;
