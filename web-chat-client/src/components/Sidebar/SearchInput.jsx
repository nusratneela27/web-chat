import { Box, TextField, IconButton } from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import { useDispatch } from "react-redux";
import { setSelectedConversation } from "../../redux/slices/conversationSlice";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { conversations } = useGetConversations();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
     return toast.error("Search term must be at least 3 characters long.");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      dispatch(setSelectedConversation(conversation));
      setSearch("");
    } else {
      toast.error("No conversation found with that name.");
    }
  };

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <TextField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search…"
        variant="outlined"
        size="small"
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "999px",
          },
        }}
      />

      <IconButton
        type="submit"
        sx={{
          backgroundColor: "primary.main",
          color: "white.main",
          "&:hover": {
            backgroundColor: "secondary.main",
          },
        }}
      >
        <PersonSearchIcon size={24} />
      </IconButton>
    </Box>
  );
};

export default SearchInput;
