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
  stock: number;
  _id: string;
};

const ItemCard: React.FC<ItemProps> = ({ name, price, image, _id, stock }) => {
  const [desiredQuantity, setDesiredQuantity] = useState(stock > 0 ? 1 : 0);

  const addToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = currentCart.findIndex(
      (item: any) => item._id === _id
    );
    if (existingItemIndex !== -1) {
      let item = currentCart[existingItemIndex];
      if (item.quantity + desiredQuantity > stock) {
        alert("Brak dostępności podanej liczby produktów! ❌");
        return;
      }
      item.quantity += desiredQuantity;
    } else {
      currentCart.push({
        _id,
        name,
        price,
        image,
        stock,
        quantity: desiredQuantity,
      });
    }
    localStorage.setItem("cart", JSON.stringify(currentCart));
    alert("Dodano do koszyka ✅");
  };

  const increaseQuantity = () => {
    let newdesiredQuantity = desiredQuantity + 1;
    setDesiredQuantity(newdesiredQuantity);
  };

  const decreaseQuantity = () => {
    let newdesiredQuantity = desiredQuantity - 1;
    setDesiredQuantity(newdesiredQuantity);
  };

  return (
    <Card sx={{ width: 270 }}>
      {stock === 0 ? (
        <CardMedia
          sx={{ height: 250, filter: "brightness(35%)" }}
          image={`http://localhost:8000${image}`}
          title={name}
        />
      ) : (
        <CardMedia
          sx={{ height: 250 }}
          image={`http://localhost:8000${image}`}
          title={name}
        />
      )}
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
          {stock === 0 ? (
            <></>
          ) : (
            <>
              {desiredQuantity <= 1 ? (
                <IconButton disabled sx={{ minWidth: 0 }}>
                  <RemoveIcon />
                </IconButton>
              ) : (
                <IconButton sx={{ minWidth: 0 }}>
                  <RemoveIcon
                    sx={{ color: "#1d9994" }}
                    onClick={decreaseQuantity}
                  />
                </IconButton>
              )}
            </>
          )}
          {stock === 0 ? (
            <></>
          ) : (
            <Typography variant="body2" sx={{ mx: 2 }}>
              {desiredQuantity}
            </Typography>
          )}
          {stock === 0 ? (
            <></>
          ) : (
            <>
              {stock <= desiredQuantity ? (
                <IconButton disabled sx={{ minWidth: 0 }}>
                  <AddIcon />
                </IconButton>
              ) : (
                <IconButton sx={{ minWidth: 0 }}>
                  <AddIcon
                    sx={{ color: "#1d9994" }}
                    onClick={increaseQuantity}
                  />
                </IconButton>
              )}
            </>
          )}
        </Box>
        {stock !== 0 ? (
          <Button
            size="small"
            onClick={addToCart}
            startIcon={<AddShoppingCartIcon />}
            sx={{ color: "#1d9994" }}
          >
            Dodaj
          </Button>
        ) : (
          <Typography
            variant="button"
            sx={{ color: "#df552b", fontWeight: 700 }}
          >
            wyprzedane
          </Typography>
        )}
      </CardActions>
    </Card>
  );
};

export default ItemCard;
