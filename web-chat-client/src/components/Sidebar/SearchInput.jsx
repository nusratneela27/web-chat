import { Box, TextField, IconButton } from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

const SearchInput = () => {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <TextField
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
