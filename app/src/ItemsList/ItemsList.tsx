import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ItemCard from "../ItemCard/ItemCard.tsx";
import { useEffect, useState } from "react";

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
        flexGrow: 1,
        px: { xs: 2, sm: 4, md: 6 },
        py: 3,
        mt: { xs: 2, sm: 4 },
      }}
    >
      <Grid container spacing={{ xs: 2, md: 3 }} alignItems="flex-start" wrap="wrap">
        {products &&
          products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
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
