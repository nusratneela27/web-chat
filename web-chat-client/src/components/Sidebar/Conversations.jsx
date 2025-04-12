import React from "react";
import Conversation from "./Conversation";
import { Box, CircularProgress } from "@mui/material";
import useGetConversations from "../../hooks/useGetConversations";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
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
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? <CircularProgress sx={{
        alignSelf: "center",
        mt: 10,
      }}/> : null}
    </Box>
  );
};

export default Conversations;
