import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, updateMessageStatus } from "../redux/slices/conversationSlice";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.conversation.messages);
  const selectedConversation = useSelector((state) => state.conversation.selectedConversation);

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));

      // 🔥 If this message is from the currently selected chat, mark it as read
      if (selectedConversation && newMessage.senderId === selectedConversation._id) {
        socket.emit("markAllAsRead", {
          senderId: newMessage.senderId,
          receiverId: newMessage.receiverId,
        });
      }
    });

    socket.on("messageStatusUpdate", ({ messageId, status }) => {
      dispatch(updateMessageStatus({ messageId, status }));
    });

    socket.on("messagesMarkedAsRead", ({ senderId, receiverId }) => {
      dispatch(
        setMessages(
          messages.map((msg) =>
            msg.senderId === senderId && msg.receiverId === receiverId
              ? { ...msg, status: "read" }
              : msg
          )
        )
      );
    });

    return () => {
      socket.off("newMessage");
      socket.off("messageStatusUpdate");
      socket.off("messagesMarkedAsRead");
    };
  }, [socket, messages, selectedConversation]);
};

export default useListenMessages;


// =========== without indicator ====================
// import { useEffect } from "react";
// import { useSocketContext } from "../context/SocketContext";
// import { useDispatch, useSelector } from "react-redux";
// import { setMessages } from "../redux/slices/conversationSlice";

// const useListenMessages = () => {
//     const { socket } = useSocketContext();
//     const dispatch = useDispatch();

//     const messages = useSelector((state) => state.conversation.messages);

//     useEffect(() => {
//         socket.on("newMessage", (newMessage) => {
//             dispatch(setMessages([...messages, newMessage]));
//         });

//         return () => socket?.off("newMessage");
//     }, [socket, messages, setMessages]);
// }

// export default useListenMessages;