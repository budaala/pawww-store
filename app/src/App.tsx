import "./App.css";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import AppRouter from "./routes/Router";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <Navbar />
      <Box component="main" flexGrow={1} pt="64px">
        <AppRouter/>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
