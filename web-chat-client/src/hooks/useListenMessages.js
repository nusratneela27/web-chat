import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/slices/conversationSlice";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const dispatch = useDispatch();

    const messages = useSelector((state) => state.conversation.messages);

    useEffect(() => {
        socket.on("newMessage", (newMessage) => {
           
            dispatch(setMessages([...messages, newMessage]));
        });

        return () => socket?.off("newMessage");
    }, [socket, messages, setMessages]);
}

export default useListenMessages;