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

type Product = {
  name: string;
  price: number;
  image: string;
  stock: number;
  _id: string;
};

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
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
        alert("Brak dostępności podanej liczby produktów! ❌");
        return;
      }
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
            flexDirection: "row",
            gap: 3,
          }}
        >
          <CardMedia
            sx={{ height: 400, width: 400 }}
            image={`http://localhost:8000${product.image}`}
            title={product.name}
          />
          <Box sx={{ maxWidth: 400 }}>
            <Box sx={{ pb: 5 }}>
              <Typography variant="h2" sx={{ textTransform: "none" }}>
                {product.name}
              </Typography>
              <Typography variant="body1">
                Tu się pojawi bardzo długi opis jak nasz produkt jest świetny i
                tani za to co oferuje
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: "bolder", pb: 5 }}>
              {product.price.toFixed(2)} zł
            </Typography>
            {product.stock !== 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
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
