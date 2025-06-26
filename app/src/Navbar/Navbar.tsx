import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";

export default function PrimarySearchAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#f6f6f6" }}>
        <Toolbar>
          <Link to="/">
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <img src="/src/assets/logo.png" className="h-10 w-10"></img>
              </Typography>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: "none", sm: "block" },
                  p: 1,
                  color: "#303030",
                }}
              >
                <p>
                  <strong>Pawww Store</strong>
                </p>
              </Typography>
            </Stack>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Link to="/myaccount">
              <IconButton size="large">
                <PersonIcon sx={{ color: "#303030" }} />
              </IconButton>
            </Link>
            <Link to="/cart">
              <IconButton size="large" edge="end">
                <ShoppingCartIcon sx={{ color: "#303030" }} />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
