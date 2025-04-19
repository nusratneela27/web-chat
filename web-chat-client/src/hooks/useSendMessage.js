import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/slices/conversationSlice";
import axios from "../utils/axios";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { selectedConversation } = useSelector((state) => state.conversation);

    const sendMessage = async (message, imageFile = null) => {
        if (!selectedConversation?._id) {
            toast.error("No conversation selected");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            
            // Add message if it exists (can be caption for image or text message)
            if (message) {
                formData.append('message', message);
            }
            
            // Add image file if it exists
            if (imageFile) {
                formData.append('image', imageFile);
            }

            // Validate at least one content type exists
            if (!message && !imageFile) {
                throw new Error('Either message or image is required');
            }

            const response = await axios.post(
                `/messages/send/${selectedConversation._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            const newMessage = response.data;
            dispatch(addMessage(newMessage));

            return newMessage;
        } catch (error) {
            // console.error("Error sending message:", error);
            toast.error(error.response?.data?.error || error.message || "Failed to send message");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendMessage };
};

export default useSendMessage;

// ==================== with axios no image file =========================================

// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { setMessages } from "../redux/slices/conversationSlice";
// import axios from "../utils/axios";

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
//             const response = await axios.post(`/messages/send/${selectedConversation._id}`, {
//                 message
//             })

//             const data = response.data;
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