// import {
//   Box,
//   CircularProgress,
//   IconButton,
//   InputBase,
//   Paper,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import ImageIcon from "@mui/icons-material/Image";
// import { useState } from "react";
// import useSendMessage from "../../hooks/useSendMessage";

// const MessageInput = () => {
//   const [message, setMessage] = useState("");
//   const [image, setImage] = useState(null);
//   const { loading, sendMessage } = useSendMessage();

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!message && !image) return;
//     await sendMessage(message, image);
//     setMessage("");
//     setImage(null);
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ px: 2, my: 2 }}>
//       <Paper
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
//           sx={{ ml: 1, flex: 1, fontSize: "0.875rem", color: "white.main" }}
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <IconButton component="label" sx={{ color: "white.main" }}>
//           <ImageIcon />
//           <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
//         </IconButton>
//         <IconButton type="submit" sx={{ color: "white.main" }}>
//           {loading ? <CircularProgress size={20} sx={{ color: "white.main" }} /> : <SendIcon />}
//         </IconButton>
//       </Paper>
//     </Box>
//   );
// };

// export default MessageInput;


import {
  Box,
  CircularProgress,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
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
          {loading ? (
            <CircularProgress sx={{ color: "white.main" }} size={20} />
          ) : (
            <SendIcon />
          )}
        </IconButton>
      </Paper>
    </Box>
  );
};

export default MessageInput;

// =================== normal typing and text images ==================

// import { useContext, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Box, CircularProgress, IconButton, InputBase, Paper } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import useSendMessage from "../../hooks/useSendMessage";
// import { useSocketContext } from "../../context/SocketContext";
// import { AuthContext } from "../../context/AuthContext";

// const MessageInput = () => {
//   const [message, setMessage] = useState("");
//   const { loading, sendMessage } = useSendMessage();
//   const { socket } = useSocketContext();
//   const selectedConversation = useSelector(state => state.conversation.selectedConversation);
//   const { authUser: currentUser } = useContext(AuthContext);

//   useEffect(() => {
//     if (!socket) return;

//     const timeout = setTimeout(() => {
//       if (message) {
//         socket.emit("typing", {
//           senderId: currentUser._id,
//           receiverId: selectedConversation._id,
//         });
//       } else {
//         socket.emit("stopTyping", {
//           senderId: currentUser._id,
//           receiverId: selectedConversation._id,
//         });
//       }
//     }, 300); // delay to prevent spamming

//     return () => clearTimeout(timeout);
//   }, [message, socket, currentUser._id, selectedConversation._id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!message) return;
//     await sendMessage(message);
//     setMessage("");

//     socket.emit("stopTyping", {
//       senderId: currentUser._id,
//       receiverId: selectedConversation._id,
//     });
//   };

//   return (
//     <Box onSubmit={handleSubmit} component="form" sx={{ px: 2, my: 2 }}>
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
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <IconButton type="submit" sx={{ color: "white.main" }}>
//           {loading ? (
//             <CircularProgress sx={{ color: "white.main" }} size={20} />
//           ) : (
//             <SendIcon />
//           )}
//         </IconButton>
//       </Paper>
//     </Box>
//   );
// };

// export default MessageInput;
