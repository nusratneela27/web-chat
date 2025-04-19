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

  const renderStatus = () => {
    switch (message.status) {
      case "sent":
        return "✔️";
      case "delivered":
        return "✔️✔️";
      case "read":
        return "✅";
      default:
        return "";
    }
  };

  // const renderContent = () => {
  //   if (message.isImage) {
  //     return (
  //       <img
  //       src={`${import.meta.env.VITE_API_URL}${message.image}`}
  //         alt="Sent content"
  //         style={{
  //           maxWidth: "100%",
  //           maxHeight: "300px",
  //           borderRadius: "12px",
  //           objectFit: "cover"
  //         }}
  //       />
  //     );
  //   }
  //   return (
  //     <Typography variant="body2">{message.message}</Typography>
  //   );
  // };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: fromMe ? "flex-end" : "flex-start",
        mb: 2,
        px: 2,
      }}
    >
      {/* Message bubble and avatar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          flexDirection: fromMe ? "row-reverse" : "row",
          gap: 1,
          width: "100%",
          maxWidth: "80%",
        }}
      >
        <Avatar src={profilePic} sx={{ width: 32, height: 32 }} />

        {/* <Box
          sx={{
            backgroundColor: fromMe ? "primary.main" : "secondary.main",
            color: "white.main",
            px: 2,
            py: 1,
            borderRadius: "16px",
            wordBreak: "break-word",
            display: "flex",
            flexDirection: "column",
            gap: 1
          }}
        >
          {renderContent()} */}

        <Box
          sx={{
            backgroundColor: fromMe ? "primary.main" : "secondary.main",
            color: "white.main",
            px: message.isImage ? 0 : 2,
            py: message.isImage ? 0 : 1,
            borderRadius: 4,
            overflow: "hidden", // Important for image rounding
          }}
        >
          {message.isImage ? (
            <img
              src={`${import.meta.env.VITE_API_URL || ""}${message.image}`}
              alt="User sent content"
              style={{
                width: "100%",
                maxWidth: "300px",
                display: "block",
              }}
            />
          ) : (
            <Typography>{message.message}</Typography>
          )}

          {/* Caption for images */}
          {message.isImage && message.message && (
            <Box sx={{ px: 2, pb: 1, pt: 0.5 }}>
              <Typography variant="body2">{message.message}</Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Timestamp & Status */}
      <Typography
        variant="caption"
        sx={{
          opacity: 0.6,
          mt: 0.5,
          mr: fromMe ? 6 : 0,
          ml: fromMe ? 0 : 6,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        {formattedTime}
        {fromMe && <span>{renderStatus()}</span>}
      </Typography>
    </Box>
  );
};

export default Message;

// ================ with indicator (sent, delivered, read)====================

// import { Box, Avatar, Typography } from "@mui/material";
// import { useAuthContext } from "../../context/AuthContext";
// import { useSelector } from "react-redux";
// import { extractTime } from "../../utils/extractTime";

// const Message = ({ message }) => {
//   const { authUser } = useAuthContext();
//   const selectedConversation = useSelector(
//     (state) => state.conversation.selectedConversation
//   );
//   const fromMe = message.senderId === authUser._id;
//   const formattedTime = extractTime(message.createdAt);
//   const profilePic = fromMe
//     ? authUser.profilePic
//     : selectedConversation?.profilePic;

//   const renderStatus = () => {
//     switch (message.status) {
//       case "sent":
//         return "✔️";
//       case "delivered":
//         return "✔️✔️";
//       case "read":
//         return "✅";
//       default:
//         return "";
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: fromMe ? "flex-end" : "flex-start",
//         mb: 1,
//       }}
//     >
//       {/* Message bubble and avatar */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "flex-end",
//           flexDirection: fromMe ? "row-reverse" : "row",
//           gap: 1,
//         }}
//       >
//         <Avatar src={profilePic} sx={{ width: 40, height: 40 }} />
//         <Box
//           sx={{
//             backgroundColor: fromMe ? "primary.main" : "secondary.main",
//             color: "white.main",
//             px: 2,
//             py: 1,
//             borderRadius: "16px",
//             maxWidth: "70%",
//             wordBreak: "break-word",
//           }}
//         >
//           <Typography variant="body2">{message.message}</Typography>
//         </Box>
//       </Box>

//       {/* Timestamp & Status */}
//       <Typography
//         variant="caption"
//         sx={{
//           opacity: 0.6,
//           mt: 0.5,
//           mr: fromMe ? 6 : 0,
//           ml: fromMe ? 0 : 6,
//           display: "flex",
//           alignItems: "center",
//           gap: 0.5,
//         }}
//       >
//         {formattedTime}
//         {fromMe && <span>{renderStatus()}</span>}
//       </Typography>
//     </Box>
//   );
// };

// export default Message;

// =========== without indicator====================

// import { Box, Avatar, Typography } from "@mui/material";
// import { useAuthContext } from "../../context/AuthContext";
// import { useSelector } from "react-redux";
// import { extractTime } from "../../utils/extractTime";

// const Message = ({ message }) => {
//   const { authUser } = useAuthContext();
//   const selectedConversation = useSelector(
//     (state) => state.conversation.selectedConversation
//   );
//   const fromMe = message.senderId === authUser._id;
//   const formattedTime = extractTime(message.createdAt);
//   const profilePic = fromMe
//     ? authUser.profilePic
//     : selectedConversation?.profilePic;

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: fromMe ? "flex-end" : "flex-start",
//         mb: 1,
//       }}
//     >
//       {/* Message bubble and avatar */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "flex-end",
//           flexDirection: fromMe ? "row-reverse" : "row",
//           gap: 1,
//         }}
//       >
//         <Avatar src={profilePic} sx={{ width: 40, height: 40 }} />
//         <Box
//           sx={{
//             backgroundColor: fromMe ? "primary.main" : "secondary.main",
//             color: "white.main",
//             px: 2,
//             py: 1,
//             borderRadius: "16px",
//             maxWidth: "70%",
//             wordBreak: "break-word",
//           }}
//         >
//           <Typography variant="body2">{message.message}</Typography>
//         </Box>
//       </Box>

//       {/* Timestamp */}
//       <Typography
//         variant="caption"
//         sx={{
//           opacity: 0.6,
//           mt: 0.5,
//           mr: fromMe ? 6 : 0,
//           ml: fromMe ? 0 : 6,
//         }}
//       >
//         {formattedTime}
//       </Typography>
//     </Box>
//   );
// };

// export default Message;
