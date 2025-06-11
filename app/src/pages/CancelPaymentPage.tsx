import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function CancelPayment() {
  return (
    <>
      <Box
        p={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="/src/assets/error.png" className="h-50 w-50" />
        <Typography
          variant="h2"
          sx={{
            textTransform: "none",
            display: "flex",
            justifyContent: "center",
          }}
          gutterBottom
        >
          Zamówienie nie zostało złożone!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textTransform: "none",
            display: "flex",
            justifyContent: "center",
          }}
          gutterBottom
        >
          Coś poszło nie tak przy płatności. Spróbuj zamówić produkty ponownie.
        </Typography>
        <Box display="flex" justifyContent="center">
          <Link to="/">
            <Button
              size="large"
              variant="contained"
              sx={{ backgroundColor: "#1d9994", my: 2 }}
            >
              Powrót do strony głównej
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}
