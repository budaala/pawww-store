import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MasonryProductList from "../ItemsList/MasonryItemsList.tsx";

const HomePage = () => {
  return (
    <>
      <Box
        sx={{
          height: "60vh",
          backgroundImage: 'url("src/assets/baner.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textShadow: "0 1px 3px rgba(0,0,0,0.5)",
        }}
      >
        <Typography variant="h2">Pawww Store</Typography>
        <Typography variant="subtitle1" gutterBottom>
          W trosce o Twojego pupila
        </Typography>
      </Box>
      <MasonryProductList />
    </>
  );
};

export default HomePage;
