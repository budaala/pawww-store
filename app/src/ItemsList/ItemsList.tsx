import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ItemCard from "../ItemCard/ItemCard.tsx";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

export default function ResponsiveGrid() {
  type Product = {
    _id: string;
    name: string;
    price: number;
    image: string;
    stock: number;
  };

  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        mx: "auto",
      }}
    >
      <Typography
        variant="h3"
        sx={{ display: "flex", justifyContent: "center", mb: 3 }}
      >
        Nasze produkty
      </Typography>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        alignItems="flex-start"
        wrap="wrap"
      >
        {products &&
          products.map((product) => (
            <Grid key={product._id}>
              <ItemCard
                name={product.name}
                price={product.price}
                image={product.image}
                _id={product._id}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
