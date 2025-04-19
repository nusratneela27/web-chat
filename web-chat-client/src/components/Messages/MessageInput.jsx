import {
  Box,
  CircularProgress,
  IconButton,
  InputBase,
  Paper,
  Badge,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import { useState, useRef } from "react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !imagePreview) return;
    
    try {
      if (imagePreview) {
        await sendMessage(null, imagePreview.file);
      } else {
        await sendMessage(message);
      }
      setMessage("");
      setImagePreview(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview({
        url: reader.result,
        file,
      });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  return (
    <Box component="div" sx={{ px: 2, my: 2 }}>
      {imagePreview && (
        <Box sx={{ position: 'relative', mb: 1 }}>
          <img
            src={imagePreview.url}
            alt="Preview"
            style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '8px' }}
          />
          <IconButton
            onClick={removeImage}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white.main',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.7)',
              },
            }}
          >
            ×
          </IconButton>
        </Box>
      )}
      
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "primary.main",
          borderRadius: 2,
          p: "2px 8px",
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <IconButton 
          onClick={() => fileInputRef.current.click()}
          sx={{ color: "white.main" }}
        >
          <Badge color="error" variant="dot" invisible={!imagePreview}>
            <ImageIcon />
          </Badge>
        </IconButton>
        
        <InputBase
          placeholder={imagePreview ? "" : "Send a message"}
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
        
        <IconButton 
          type="submit" 
          sx={{ color: "white.main" }}
          disabled={!message && !imagePreview}
        >
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

// =================== normal typing text ==================

// import {
//   Box,
//   CircularProgress,
//   IconButton,
//   InputBase,
//   Paper,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import { useState } from "react";
// import useSendMessage from "../../hooks/useSendMessage";

// const MessageInput = () => {
//   const [message, setMessage] = useState("");
//   const { loading, sendMessage } = useSendMessage();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!message) return;
//     await sendMessage(message);
//     setMessage("");
//   };

//   return (
//     <Box onClick={handleSubmit} component="form" sx={{ px: 2, my: 2 }}>
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
