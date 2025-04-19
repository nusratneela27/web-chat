import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useSocketContext } from "../../context/SocketContext";
import { addMessage } from "../../redux/slices/conversationSlice";
import { useAuthContext } from "../../context/AuthContext";

const MessageListener = () => {
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();
  const dispatch = useDispatch();
  const selectedConversation = useSelector(
    (state) => state.conversation.selectedConversation
  );

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (message) => {
      dispatch(addMessage(message));

      if (selectedConversation?._id !== message.senderId) {
        toast.success(`New message from ${message.senderUsername || "User"}`);
      }
    });

    return () => socket.off("newMessage");
  }, [socket, selectedConversation, dispatch, authUser]);

  return null;
};

export default MessageListener;

// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import toast from "react-hot-toast";
// import { useSocketContext } from "../../context/SocketContext";
// import { addMessage } from "../../redux/slices/conversationSlice";
// import { useAuthContext } from "../../context/AuthContext";

// const MessageListener = () => {
//   const { socket } = useSocketContext();
//   const { authUser } = useAuthContext();
//   const dispatch = useDispatch();
//   const selectedConversation = useSelector(
//     (state) => state.conversation.selectedConversation
//   );

//   useEffect(() => {
//     console.log("MessageListener mounted", { socket, selectedConversation });

//     if (!socket) {
//       console.log("No socket connection");
//       return;
//     }
//     const handleNewMessage = (message) => {
//       console.log("Full message received:", message); // Debug log
      
//       dispatch(addMessage(message));
  
//       const currentConversationId = selectedConversation?._id?.toString();
//       const senderId = message.senderId?._id?.toString() || message.senderId?.toString();
      
//       if (currentConversationId !== senderId) {
//           const senderName = message.senderName || 
//                            message.senderId?.username || 
//                            message.senderId?.name || 
//                            "Unknown User";
//           console.log("New message notification from:", senderName);
//           toast.success(`New message from ${senderName}`);
//       }
//   };
  
//   socket.on("newMessage", handleNewMessage);

//     // Add listener for connection events for debugging
//     socket.on("connect", () => console.log("Socket connected"));
//     socket.on("disconnect", () => console.log("Socket disconnected"));
//     socket.on("connect_error", (err) => console.log("Socket error:", err));

//     return () => {
//       socket.off("newMessage", handleNewMessage);
//       socket.off("connect");
//       socket.off("disconnect");
//       socket.off("connect_error");
//     };
//   }, [socket, selectedConversation, dispatch, authUser]);

//   return null;
// };

// export default MessageListener;