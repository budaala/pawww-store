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
import { CardActionArea } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ButtonGroup } from "@mui/material";
import { Alert } from "@mui/material";

type ItemProps = {
  name: string;
  price: number;
  image: string;
  stock: number;
  _id: string;
};

const ItemCard: React.FC<ItemProps> = ({ name, price, image, _id, stock }) => {
  const [desiredQuantity, setDesiredQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [errorAddingToCart, setErrorAddingToCart] = useState(false);

  const addToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = currentCart.findIndex(
      (item: any) => item._id === _id
    );
    if (existingItemIndex !== -1) {
      let item = currentCart[existingItemIndex];
      if (item.quantity + desiredQuantity > stock) {
        setAddedToCart(false);
        setErrorAddingToCart(item.quantity);
        return;
      }
      setErrorAddingToCart(false);
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
    setAddedToCart(true);
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
    <>
      <Card sx={{ width: 270 }}>
        <CardActionArea
          component={RouterLink}
          to={`/products/${_id}`}
          sx={{
            textDecoration: "none",
          }}
        >
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
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                color: "#000000",
              }}
            >
              {name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {price.toFixed(2)} zł
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          {stock !== 0 ? (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <ButtonGroup
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  {desiredQuantity <= 1 ? (
                    <IconButton disabled>
                      <RemoveIcon />
                    </IconButton>
                  ) : (
                    <IconButton>
                      <RemoveIcon
                        sx={{ color: "#1d9994" }}
                        onClick={decreaseQuantity}
                      />
                    </IconButton>
                  )}

                  <Typography variant="body2" sx={{ mx: 2 }}>
                    {desiredQuantity}
                  </Typography>

                  {stock <= desiredQuantity ? (
                    <IconButton disabled>
                      <AddIcon />
                    </IconButton>
                  ) : (
                    <IconButton>
                      <AddIcon
                        sx={{ color: "#1d9994" }}
                        onClick={increaseQuantity}
                      />
                    </IconButton>
                  )}
                </ButtonGroup>

                <Button
                  fullWidth
                  size="medium"
                  onClick={addToCart}
                  startIcon={<AddShoppingCartIcon />}
                  sx={{ color: "#1d9994" }}
                >
                  Dodaj
                </Button>
              </Box>
              {addedToCart ? (
                <Alert
                  severity="success"
                  onClose={() => {
                    setAddedToCart(false);
                  }}
                >
                  Dodano do koszyka!
                </Alert>
              ) : (
                <></>
              )}
              {errorAddingToCart ? (
                <Alert
                  severity="error"
                  onClose={() => {
                    setErrorAddingToCart(false);
                  }}
                >
                  Nie można dodać tylu produktów. W Twoim koszyku znajduje się
                  już {errorAddingToCart} sztuk, a maksymalna dostępna ilość to{" "}
                  {stock} sztuk.
                </Alert>
              ) : (
                <></>
              )}
            </Box>
          ) : (
            <Typography
              variant="button"
              sx={{
                color: "#df552b",
                fontWeight: 700,
              }}
            >
              wyprzedane
            </Typography>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default ItemCard;
