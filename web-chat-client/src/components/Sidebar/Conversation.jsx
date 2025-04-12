import { Box, Avatar, Typography, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../../redux/slices/conversationSlice";

const Conversation = ({ conversation, lastIdx }) => {
  const dispatch = useDispatch();
  const selectedConversation = useSelector(
    (state) => state.conversation.selectedConversation
  );

  const handleSelect = () => {
    dispatch(setSelectedConversation(conversation));
  }

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
          },
          backgroundColor:
            selectedConversation?._id === conversation._id
              ? "primary.main"
              : "transparent",
        }}
      >
        {/* Avatar */}
        <Avatar src={conversation.profilePic} sx={{ width: 48, height: 48 }} />

        {/* Username */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "&:hover": {
              color: "white.main",
            },
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
            }}
          >
            {conversation.username}
          </Typography>
        </Box>
      </Box>

      {!lastIdx && <Divider />}
    </>
  );
};

export default Conversation;
