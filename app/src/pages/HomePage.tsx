import Navbar from "../Navbar/Navbar.tsx";
import ItemsList from "../ItemsList/ItemsList.tsx";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Box
        p={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "20vh" }}
      >
        <Typography variant="h3">Pawww Store</Typography>
        <Typography gutterBottom>W trosce o Twojego pupila</Typography>
      </Box>
      <ItemsList />
    </>
  );
};

export default HomePage;
