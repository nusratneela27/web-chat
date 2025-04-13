import { createTheme } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, Arial, sans-serif',
        color: "#d4d4d4"
    },
    palette: {
        primary: {
            main: "#2a3d1b",
        },
        secondary: {
            main: "#69785d"
        },
        white: {
            main: "#FFFFFF",
        },
    },
});

export default theme;