import { Box, Typography } from "@mui/material";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  return (
    <Box
      sx={{
        minWidth: { md: "450px" },
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "primary.main", 
          px: 2,
          py: 1,
          mb: 1.5,
        }}
      >
        <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
          To:{" "}
          <Typography component="span" sx={{ fontWeight: "bold", color: "white.main" }}>
            John Doe
          </Typography>
        </Typography>
      </Box>

      {/* Message list and input */}
      <Messages />
      <MessageInput />
    </Box>
  );
};

export default MessageContainer;
