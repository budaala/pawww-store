import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type CartItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function Confirmation() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const navigate = useNavigate();

  const orderPayload = {
    items: cart.map((item: any) => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
    totalPrice: cart.reduce(
      (total: number, item: any) => total + item.price * item.quantity,
      0
    ),
  };

  const submitOrder = () => {
    fetch("http://localhost:8000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    })
      .then((res) => res.json())
      .then(() => {
        localStorage.removeItem("cart");
        navigate("/order-confirmation");
      })
      .catch((err) => {
        console.error("Błąd przy składaniu zamówienia", err);
      });
  };

  return (
    <>
      <Box p={3}>
        <Typography
          variant="h2"
          sx={{
            textTransform: "none",
            display: "flex",
            justifyContent: "center",
          }}
          gutterBottom
        >
          Składanie zamówienia
        </Typography>
        <Typography
          variant="h3"
          sx={{
            textTransform: "none",
            display: "flex",
            justifyContent: "center",
          }}
          gutterBottom
        >
          Potwierdzenie
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="cart table">
            <TableHead>
              <TableRow>
                <TableCell>Produkt</TableCell>
                <TableCell align="right">Ilość</TableCell>
                <TableCell align="right">Cena za szt.</TableCell>
                <TableCell align="right">Łącznie</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell component="th" scope="row">
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        src={`http://localhost:8000${item.image}`}
                        variant="rounded"
                      />
                      {item.name}
                    </Box>
                  </TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">
                    {item.price.toFixed(2)} zł
                  </TableCell>
                  <TableCell align="right">
                    {(item.price * item.quantity).toFixed(2)} zł
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <strong>Suma</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>{totalPrice.toFixed(2)} zł</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Link to="/cart">
              <Button
                size="large"
                variant="outlined"
                sx={{ borderColor: "#df552b", color: "#df552b", my: 2 }}
              >
                Powrót do koszyka
              </Button>
            </Link>
          </Box>
          <Box>
            <Link to="/checkout/confirmation">
              <Button
                size="large"
                variant="contained"
                sx={{ backgroundColor: "#1d9994", my: 2 }}
                onClick={submitOrder}
              >
                Potwierdź i zapłać
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}
