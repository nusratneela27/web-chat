import { Box, Avatar, Typography, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../../redux/slices/conversationSlice";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, lastIdx }) => {
  const dispatch = useDispatch();
  const selectedConversation = useSelector(
    (state) => state.conversation.selectedConversation
  );

  const handleSelect = () => {
    dispatch(setSelectedConversation(conversation));
  };

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <Box
        onClick={handleSelect}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 1,
          px: 2,
          borderRadius: 2,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "white.main",
          },
          backgroundColor:
            selectedConversation?._id === conversation._id
              ? "primary.main"
              : "transparent",
          color:
            selectedConversation?._id === conversation._id
              ? "white.main"
              : "text.primary",
        }}
      >
        {/* Avatar with online indicator */}
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={conversation.profilePic}
            sx={{ width: 48, height: 48 }}
          />
          {isOnline && (
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 12,
                height: 13,
                backgroundColor: "#00FF00",
                border: "none",
                borderRadius: "50%",
              }}
            />
          )}
        </Box>

        {/* Username */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
            }}
          >
            {conversation.fullName}
          </Typography>
        </Box>
      </Box>

      {!lastIdx && <Divider />}
    </>
  );
};

export default Conversation;
