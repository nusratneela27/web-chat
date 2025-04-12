import { Box, IconButton, InputBase, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <Box onClick={handleSubmit} component="form" sx={{ px: 2, my: 2 }}>
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IconButton type="submit" sx={{ color: "white.main" }}>
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default MessageInput;

// import { Box, IconButton, InputBase, Paper } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";

// const MessageInput = () => {
//   return (
//     <Box component="form" sx={{ px: 2, my: 2 }}>
//       <Paper
//         component="div"
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           backgroundColor: "primary.main",
//           borderRadius: 2,
//           p: "2px 8px",
//         }}
//       >
//         <InputBase
//           placeholder="Send a message"
//           sx={{
//             ml: 1,
//             flex: 1,
//             fontSize: "0.875rem",
//             color: "white.main",
//           }}
//           inputProps={{ "aria-label": "send message" }}
//         />
//         <IconButton type="submit" sx={{ color: "white.main" }}>
//           <SendIcon />
//         </IconButton>
//       </Paper>
//     </Box>
//   );
// };

// export default MessageInput;
