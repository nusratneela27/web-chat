import { Box } from "@mui/material";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMesages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useEffect, useRef } from "react";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  // console.log("messages", messages);
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

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
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <Box key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </Box>
        ))}
        
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "text.secondary",
          }}
        >
          Send messages to start a conversation
        </Box>
      )}
    </Box>
  );
};

export default Messages;

// ========================== typing =====================

// import { useState, useEffect, useRef, useContext } from "react";
// import { useSelector } from "react-redux";
// import { Box, Typography } from "@mui/material";
// import useGetMessages from "../../hooks/useGetMesages";
// import useListenMessages from "../../hooks/useListenMessages";
// import Message from "./Message";
// import MessageSkeleton from "../skeletons/MessageSkeleton";
// import { useSocketContext } from "../../context/SocketContext";
// import { AuthContext } from "../../context/AuthContext";

// const Messages = () => {
//   const { messages, loading } = useGetMessages();
//   const selectedConversation = useSelector(state => state.conversation.selectedConversation);
//   const { authUser: currentUser } = useContext(AuthContext);
//   const { socket } = useSocketContext();
//   const [isTyping, setIsTyping] = useState(false);
//   const lastMessageRef = useRef();

//   useListenMessages();

//   useEffect(() => {
//     socket?.on("typing", ({ senderId, receiverId }) => {
//       if (receiverId === currentUser._id && senderId === selectedConversation._id) {
//         setIsTyping(true);
//       }
//     });

//     socket?.on("stopTyping", ({ senderId, receiverId }) => {
//       if (receiverId === currentUser._id && senderId === selectedConversation._id) {
//         setIsTyping(false);
//       }
//     });

//     return () => {
//       socket?.off("typing");
//       socket?.off("stopTyping");
//     };
//   }, [socket, currentUser._id, selectedConversation?._id]);

//   useEffect(() => {
//     setTimeout(() => {
//       lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100);
//   }, [messages]);

//   return (
//     <Box
//       sx={{
//         px: 2,
//         flex: 1,
//         overflowY: "auto",
//         display: "flex",
//         flexDirection: "column",
//         gap: 1.5,
//       }}
//     >
//       {!loading &&
//         messages.length > 0 &&
//         messages.map((message) => (
//           <Box key={message._id} ref={lastMessageRef}>
//             <Message message={message} />
//           </Box>
//         ))}

//       {isTyping && (
//         <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic", ml: 1 }}>
//           Typing...
//         </Typography>
//       )}

//       {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

//       {!loading && messages.length === 0 && (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100%",
//             color: "text.secondary",
//           }}
//         >
//           Send messages to start a conversation
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Messages;