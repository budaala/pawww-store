import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import ItemCard from "../ItemCard/ItemCard";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";

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
    <>
      {products.length ? (
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
            sx={{ display: "flex", justifyContent: "center", mt: 3 }}
          >
            Nasze produkty
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ display: "flex", justifyContent: "center", mb: 3 }}
          >
            Wszystkie produkty zostały wytworzone z największą precyzją.
          </Typography>
          <Box sx={{ width: "full", maxWidth: 1400 }}>
            <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
              {products.map((product) => (
                <div key={product._id}>
                  <ItemCard
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    _id={product._id}
                    stock={product.stock}
                  />
                </div>
              ))}
            </Masonry>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: 550,
              px: 4,
              py: 4,
              border: "2px solid #df552b",
            }}
          >
            <img
              src="src/assets/error.png"
              alt="error"
              loading="lazy"
              className="w-50 h-50"
            />
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              Coś poszło nie tak!
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center", mx: 2 }}>
              Aktualnie nie możemy załadować naszych produktów. Spróbuj ponownie
              później.
            </Typography>
          </Paper>
        </Box>
      )}
    </>
  );
}
