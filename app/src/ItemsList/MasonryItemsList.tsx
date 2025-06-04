import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import ItemCard from "../ItemCard/ItemCard";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

export default function BasicMasonry() {
  type Product = {
    _id: string;
    name: string;
    price: number;
    image: string;
    stock: number;
  };

  const [products, setProducts] = useState<Product[]>([]);

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
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h3"
        sx={{ display: "flex", justifyContent: "center", my: 3 }}
      >
        Nasze produkty
      </Typography>
      <Box sx={{ width: "full", maxWidth: 1400 }}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
          {products &&
            products.map((product) => (
              <div key={product._id}>
                <ItemCard
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  _id={product._id}
                />
              </div>
            ))}
        </Masonry>
      </Box>
    </Box>
  );
}
