import { Box, Avatar, Typography } from "@mui/material";

const Message = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        mb: 2,
      }}
    >
      {/* Avatar and message bubble */}
      <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
        <Box
          sx={{
            backgroundColor: "#0284c7", // sky-600
            color: "white",
            px: 2,
            py: 1,
            borderRadius: "16px",
            maxWidth: "70%",
            wordBreak: "break-word",
          }}
        >
          <Typography variant="body2">Hi</Typography>
        </Box>

        <Avatar
          alt="User"
          src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
          sx={{ width: 40, height: 40 }}
        />
      </Box>

      {/* Footer with timestamp */}
      <Typography
        variant="caption"
        sx={{ opacity: 0.6, mt: 0.5, mr: 6 }}
      >
        12:11
      </Typography>
    </Box>
  );
};

export default Message;
