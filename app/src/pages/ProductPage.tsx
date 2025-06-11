import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import { Box, Typography } from "@mui/material";
import { Paper, CardMedia } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ButtonGroup } from "@mui/material";
import { Alert } from "@mui/material";
import { Chip } from "@mui/material";

type Product = {
  name: string;
  price: number;
  image: string;
  stock: number;
  category: string;
  description: string;
  _id: string;
};

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [addedToCart, setAddedToCart] = useState(false);
  const [errorAddingToCart, setErrorAddingToCart] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${productId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      });
  }, []);

  const [desiredQuantity, setDesiredQuantity] = useState(1);

  const addToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = currentCart.findIndex(
      (item: any) => item._id === product?._id
    );
    if (existingItemIndex !== -1) {
      let item = currentCart[existingItemIndex];
      if (product && item.quantity + desiredQuantity > product.stock) {
        setAddedToCart(false);
        setErrorAddingToCart(item.quantity);
        return;
      }
      setErrorAddingToCart(false);
      item.quantity += desiredQuantity;
    } else {
      currentCart.push({
        _id: product?._id,
        name: product?.name,
        price: product?.price,
        image: product?.image,
        stock: product?.stock,
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

  if (!product) return <Loading label="Ładujemy produkt Twoich marzeń... " />;
  return (
    <>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Link component={RouterLink} to="/">
          Powrót na stronę główną
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
        }}
      >
        <Paper
          sx={{
            width: "90%",
            maxWidth: 1000,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { xs: "center", sm: "space-evenly" },
            p: 3,
            gap: 3,
          }}
        >
          <CardMedia
            sx={{ height: { xs: 200, sm: 400 }, width: { xs: 200, sm: 400 } }}
            image={`http://localhost:8000${product.image}`}
            title={product.name}
          />
          <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Chip
                label={product.category}
                sx={{ backgroundColor: "#1d9994", color: "#ffffff" }}
              />
            </Box>
            <Box sx={{ pb: 5, pt: 2 }}>
              <Typography variant="h3" component="h2">
                {product.name}
              </Typography>
              <Typography variant="body1" sx={{ pt: 2 }}>
                {product.description}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: "bolder", pb: 5 }}>
              {product.price.toFixed(2)} zł
            </Typography>
            {product.stock !== 0 ? (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
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

                    {product.stock <= desiredQuantity ? (
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
                    variant="contained"
                    onClick={addToCart}
                    startIcon={<AddShoppingCartIcon />}
                    sx={{ backgroundColor: "#1d9994" }}
                  >
                    Dodaj
                  </Button>
                </Box>
                {addedToCart ? (
                  <Alert severity="success">Dodano do koszyka!</Alert>
                ) : (
                  <></>
                )}
                {errorAddingToCart ? (
                  <Alert severity="error">
                    Nie można dodać tylu produktów. W Twoim koszyku znajduje się
                    już {errorAddingToCart} sztuk, a maksymalna dostępna ilość
                    to {product.stock} sztuk.
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
                  fontSize: "large",
                }}
              >
                wyprzedane
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default ProductPage;
