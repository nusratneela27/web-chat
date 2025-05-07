// import { Box, useMediaQuery, useTheme, IconButton } from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';
// import MessageContainer from "../../components/Messages/MessageContainer";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import MessageListener from "../../components/Messages/MessageListener";
// import { useState } from "react";

// const Home = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const handleSidebarToggle = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <Box
//       sx={{
//         p: 4,
//         height: "90vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           height: { sm: 450, md: 700 },
//           width: "100%",
//           maxWidth: { md: "700px" },
//           borderRadius: 2,
//           backgroundColor: "rgba(156, 163, 175, 0.3)",
//           // backdropFilter: "blur(10px)",
//           // WebkitBackdropFilter: "blur(10px)",
//           boxShadow: 3,
//           // position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         {/* Mobile menu button (only visible on mobile) */}
//         {isMobile && (
//           <IconButton
//             onClick={handleSidebarToggle}
//             sx={{
//               position: "absolute",
//               top: 8,
//               left: 10,
//               // zIndex: 1200,
//               color: "white.main",
//               backgroundColor: "rgba(0,0,0,0.2)",
//               '&:hover': {
//                 backgroundColor: "rgba(0,0,0,0.3)",
//               }
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//         )}

//         {/* Sidebar */}
//         <Box
//           sx={{
//             width: { xs: sidebarOpen ? "250px" : 0, md: "250px" },
//             flexShrink: 0,
//             transition: theme.transitions.create('width', {
//               easing: theme.transitions.easing.sharp,
//               duration: theme.transitions.duration.enteringScreen,
//             }),
//             overflowX: "hidden",
//             visibility: { xs: sidebarOpen ? "visible" : "hidden", md: "visible" },
//           }}
//         >
//           <Sidebar
//             onToggle={handleSidebarToggle}
//             isMobile={isMobile}
//           />
//         </Box>

//         {/* Main content area */}
//         <MessageContainer />
//       </Box>
//       <MessageListener />
//     </Box>
//   );
// };

// export default Home;

// ======================= without responsive ===============

// import { Box } from "@mui/material";
// import MessageContainer from "../../components/Messages/MessageContainer";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import MessageListener from "../../components/Messages/MessageListener";

// const Home = () => {
//   return (
//     <Box
//       sx={{
//         p: 4,
//         height: "90vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           height: { sm: 450, md: 700 },
//           borderRadius: 2,
//           // overflow: "hidden",
//           backgroundColor: "rgba(156, 163, 175, 0.3)",
//           backdropFilter: "blur(10px)",
//           WebkitBackdropFilter: "blur(10px)",
//           boxShadow: 3,
//         }}
//       >
//         <Sidebar />
//         <MessageContainer />
//       </Box>
//       <MessageListener/>
//     </Box>
//   );
// };

// export default Home;

// ================== with responsive ================
import { Box } from "@mui/material";
import MessageContainer from "../../components/Messages/MessageContainer";
import Sidebar from "../../components/Sidebar/Sidebar";
import MessageListener from "../../components/Messages/MessageListener";
import MobileSidebar from "../../components/Sidebar/MobileSidebar";
import { useMediaQuery, useTheme } from "@mui/material";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        p: isMobile ? 0 : 4,
        height: isMobile ? "100vh" : "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <MobileSidebar />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: isMobile ? "100%" : { md: "700px" },
          height: isMobile ? "90%" : { md: "700px" },
          borderRadius: isMobile ? 0 : 2,
          backgroundColor: isMobile ? "" : "rgba(156, 163, 175, 0.3)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: isMobile ? 0 : 3,
        }}
      >
        {!isMobile && <Sidebar />}
        <MessageContainer />
      </Box>
      <MessageListener />
    </Box>
  );
};

export default Home;
