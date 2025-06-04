import { Box, Typography, Grid } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        mt: 6,
        py: 4,
        px: 2,
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Grid container spacing={3} justifyContent="space-between">
        <Grid sx={{ xs: 12, sm: 4 }}>
          <Typography variant="h6" gutterBottom>
            🐾 Pawww Store
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sklep stworzony z myślą o Twoim pupilu.
          </Typography>
        </Grid>

        <Grid sx={{ xs: 12, sm: 4 }}>
          <Typography variant="h6" gutterBottom>
            Kontakt
          </Typography>
          <Typography variant="body2">kontakt@pawww.store</Typography>
          <Typography variant="body2">+48 123 456 789</Typography>
        </Grid>
      </Grid>

      <Box mt={4} textAlign="center">
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} Pawww Store. Wszelkie prawa zastrzeżone.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
