import { Box, Typography, Stack } from "@mui/material";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  const noChatSelected = true;
  return (
    <Box
      sx={{
        minWidth: { md: "450px" },
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      {noChatSelected ? (
        <NoChatSelected />
      ) : (
        <>
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
              <Typography
                component="span"
                sx={{ fontWeight: "bold", color: "white.main" }}
              >
                John Doe
              </Typography>
            </Typography>
          </Box>

          {/* Message list and input */}
          <Messages />
          <MessageInput />
        </>
      )}
    </Box>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack spacing={2} alignItems="center" textAlign="center" sx={{ px: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
          }}
        >
          Welcome 👋 neela❄
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
          }}
        >
          Select a chat to start messaging
        </Typography>
      </Stack>
    </Box>
  );
};
