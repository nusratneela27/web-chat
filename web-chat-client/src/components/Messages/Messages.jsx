import { Box } from "@mui/material";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMesages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useEffect, useRef } from "react";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  // console.log("messages", messages);
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

      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <Box key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </Box>
        ))}
    </Box>
  );
};

export default Messages;

// import { Box } from "@mui/material";
// import Message from "./Message";

// const Messages = () => {
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
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />

//     </Box>
//   );
// };

// export default Messages;
