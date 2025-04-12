import { createTheme } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, Arial, sans-serif',
        color: "#d4d4d4"
    },
    palette: {
        primary: {
            main: "#301934",
        },
        secondary: {
            main: "#5c5673"
        },
        white: {
            main: "#FFFFFF",
        },
    },
});

export default theme;