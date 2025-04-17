import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/slices/conversationSlice";
import axios from "../utils/axios";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const selectedConversation = useSelector(
        (state) => state.conversation.selectedConversation
    )

    const messages = useSelector((state) => state.conversation.messages);

    const sendMessage = async (message) => {
        if (!selectedConversation?._id) {
            toast.error("No conversation selected");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`/messages/send/${selectedConversation._id}`, {
                message
            })

            const data = response.data;
            dispatch(setMessages([...messages, data]));
        } catch (error) {
            toast.error(error.message);
            console.error("Error sending message:", error);
        } finally {
            setLoading(false);
        }
    };
    return { sendMessage, loading };
}

export default useSendMessage;

// ================= without axios =========

// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { setMessages } from "../redux/slices/conversationSlice";

// const useSendMessage = () => {
//     const [loading, setLoading] = useState(false);
//     const dispatch = useDispatch();

//     const selectedConversation = useSelector(
//         (state) => state.conversation.selectedConversation
//     )

//     const messages = useSelector((state) => state.conversation.messages);

//     const sendMessage = async (message) => {
//         if (!selectedConversation?._id) {
//             toast.error("No conversation selected");
//             return;
//         }

//         setLoading(true);
//         try {
//             const response = await fetch(`${import.meta.env.VITE_API_URL}/messages/send/${selectedConversation._id}`, {
//                 method: "POST",
//                 credentials: "include",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ message }),
//             });

//             const data = await response.json();
//             if (data.error) {
//                 throw new Error(data.error);
//             }

//             dispatch(setMessages([...messages, data]));
//         } catch (error) {
//             toast.error(error.message);
//             console.error("Error sending message:", error);
//         } finally {
//             setLoading(false);
//         }
//     };
//     return { sendMessage, loading };
// }

// export default useSendMessage;