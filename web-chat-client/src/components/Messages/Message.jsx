import { Box, Avatar, Typography } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const selectedConversation = useSelector(
    (state) => state.conversation.selectedConversation
  );

  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: fromMe ? "flex-end" : "flex-start",
        mb: 1,
      }}
    >
      {/* Message bubble and avatar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          flexDirection: fromMe ? "row-reverse" : "row",
          gap: 1,
        }}
      >
        <Avatar src={profilePic} sx={{ width: 40, height: 40 }} />
        <Box
          sx={{
            backgroundColor: fromMe ? "primary.main" : "secondary.main",
            color: "white.main",
            px: 2,
            py: 1,
            borderRadius: "16px",
            maxWidth: "70%",
            wordBreak: "break-word",
          }}
        >
          <Typography variant="body2">{message.message}</Typography>
        </Box>
      </Box>

      {/* Timestamp */}
      <Typography
        variant="caption"
        sx={{
          opacity: 0.6,
          mt: 0.5,
          mr: fromMe ? 6 : 0,
          ml: fromMe ? 0 : 6,
        }}
      >
        {formattedTime}
      </Typography>
    </Box>
  );
};

export default Message;
