import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    h1: { fontFamily: "'Montserrat', sans-serif" },
    h2: { fontFamily: "'Montserrat', sans-serif", textTransform: "uppercase"  },
    h3: { fontFamily: "'Montserrat', sans-serif"},
    h4: { fontFamily: "'Montserrat', sans-serif" },
    h5: { fontFamily: "'Montserrat', sans-serif" },
    h6: { fontFamily: "'Montserrat', sans-serif" },
  },
  
});
export default theme;
