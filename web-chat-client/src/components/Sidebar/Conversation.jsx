import { Box, Avatar, Typography, Divider } from "@mui/material";

const Conversation = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 1,
          px: 2,
          borderRadius: 2,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "primary.main", // sky-500
          },
        }}
      >
        {/* Avatar */}
        <Avatar
          alt="User Avatar"
          src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
          sx={{ width: 48, height: 48 }}
        />

        {/* Username & Emoji */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", }}>
            John Doe
          </Typography>
          {/* <Typography variant="body1" component="span" fontSize={20}>
            🎃
          </Typography> */}
        </Box>
      </Box>

      <Divider sx={{ my: 0.5 }} />
    </>
  );
};

export default Conversation;
