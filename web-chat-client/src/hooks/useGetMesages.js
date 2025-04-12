import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/slices/conversationSlice";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const selectedConversation = useSelector(
        (state) => state.conversation.selectedConversation
    );
    
    const messages = useSelector((state) => state.conversation.messages);

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/messages/${selectedConversation._id}`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                dispatch(setMessages(data));
            } catch (error) {
                toast.error(error.message);
                console.error("Error fetching messages:", error);
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, dispatch]);

    return { messages, loading };

}
export default useGetMessages;