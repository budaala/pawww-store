import Navbar from "../Navbar/Navbar.tsx";
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

type CartItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const clear = (productId: string) => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const newCart = currentCart.filter((item: CartItem) => item._id !== productId);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems(newCart);
    alert("Produkt został usunięty z koszyka");
  };

  return (
    <>
      <Navbar />
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          🛒 Twój koszyk
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
                  <TableCell align="right">
                    <Button onClick={() => clear(item._id)}>X</Button>
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
      </Box>
    </>
  );
};

export default CartPage;
