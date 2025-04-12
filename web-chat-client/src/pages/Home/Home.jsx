import { Box } from "@mui/material";
import MessageContainer from "../../components/Messages/MessageContainer";
import Sidebar from "../../components/Sidebar/Sidebar";

const Home = () => {
  return (
    <Box
      sx={{
        p: 4,
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: { sm: 450, md: 700 },
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: "rgba(156, 163, 175, 0.3)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <Sidebar />
        <MessageContainer />
      </Box>
    </Box>
  );
};

export default Home;
