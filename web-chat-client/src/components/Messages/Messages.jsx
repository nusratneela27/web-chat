import { Box } from "@mui/material";
import Message from "./Message";

const Messages = () => {
  return (
    <Box
      sx={{
        px: 2,
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <Message />
      <Message />
    </Box>
  );
};

export default Messages;
