import { Box, IconButton, InputBase, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const MessageInput = () => {
  return (
    <Box component="form" sx={{ px: 2, my: 2 }}>
      <Paper
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "primary.main",
          borderRadius: 2,
          p: "2px 8px",
        }}
      >
        <InputBase
          placeholder="Send a message"
          sx={{
            ml: 1,
            flex: 1,
            fontSize: "0.875rem",
            color: "white.main",
          }}
          inputProps={{ "aria-label": "send message" }}
        />
        <IconButton type="submit" sx={{ color: "white.main" }}>
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default MessageInput;
