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
