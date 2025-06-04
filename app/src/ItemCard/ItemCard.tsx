import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

type ItemProps = {
  name: string;
  price: number;
  image: string;
  _id: string;
};

const ItemCard: React.FC<ItemProps> = ({ name, price, image, _id }) => {
  const [count, setCount] = useState(1);

  const addToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = currentCart.findIndex(
      (item: any) => item._id === _id
    );
    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += count;
    } else {
      currentCart.push({
        _id,
        name,
        price,
        image,
        quantity: count,
      });
    }
    localStorage.setItem("cart", JSON.stringify(currentCart));
    alert("Dodano do koszyka ✅");
  };

  return (
    <Card sx={{ width: 270 }}>
      <CardMedia
        sx={{ height: 250 }}
        image={`http://localhost:8000${image}`}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {price.toFixed(2)} zł
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <IconButton size="small">
            <RemoveIcon
              fontSize="small"
              sx={{ color: "#1d9994" }}
              onClick={() => setCount((count) => count - 1)}
            />
          </IconButton>
          <Typography variant="body2" sx={{ mx: 2 }}>
            {count}
          </Typography>
          <IconButton
            size="small"
            onClick={() => setCount((count) => count + 1)}
          >
            <AddIcon fontSize="small" sx={{ color: "#1d9994" }} />
          </IconButton>
        </Box>
        <Button
          size="small"
          onClick={addToCart}
          startIcon={<AddShoppingCartIcon />}
          sx={{ color: "#1d9994" }}
        >
          Dodaj
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
