import { Box, LinearProgress, Typography } from "@mui/material";

interface LoadingProps {
  label: string;
}

const Loading: React.FC<LoadingProps> = ({ label }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography gutterBottom>{label}</Typography>
      <LinearProgress sx={{ width: 200, color: "#fabe00" }} />
    </Box>
  );
};

export default Loading;
