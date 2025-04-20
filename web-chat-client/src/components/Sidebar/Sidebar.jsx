import React from "react";
import SearchInput from "../Sidebar/SearchInput";
import Conversations from "../Sidebar/Conversations";
import LogoutButton from "../Sidebar/LogoutButton";
import { Box, Divider } from "@mui/material";

const Sidebar = () => {
  return (
    <Box
      sx={{
        borderRight: "1px solid #90a4ae",
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: {
          xs: "85vh",    // Mobile (extra small)
          sm: "88vh",    // Small devices
          md: "95%",     // Medium and up (desktop)
        },
      }}
    >
      <SearchInput />

      <Divider sx={{ my: 2 }} />

      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <Conversations />
      </Box>

      <LogoutButton />
    </Box>
  );
};

export default Sidebar;

// ============= without responsive ==========

// import React from "react";
// import SearchInput from "../Sidebar/SearchInput";
// import Conversations from "../Sidebar/Conversations";
// import LogoutButton from "../Sidebar/LogoutButton";
// import { Box, Divider } from "@mui/material";

// const Sidebar = () => {
//   return (
//     <Box
//       sx={{
//         borderRight: "1px solid #90a4ae",
//         p: 2,
//         display: "flex",
//         flexDirection: "column",
//         height: "95%",
//       }}
//     >
//       <SearchInput />

//       <Divider sx={{ my: 2 }} />

//       <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
//         <Conversations />
//       </Box>

//       <LogoutButton />
//     </Box>
//   );
// };

// export default Sidebar;
