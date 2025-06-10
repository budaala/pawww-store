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
import IconButton from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type CartItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const increaseQuantity = (productId: string) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (productId: string) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === productId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const clear = (productId: string) => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const newCart = currentCart.filter(
      (item: CartItem) => item._id !== productId
    );
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems(newCart);
    alert("Produkt został usunięty z koszyka");
  };

  const clearAll = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
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
          🛒 Twój koszyk
        </Typography>
        {cartItems.length > 0 ? (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                sx={{ color: "#df552b" }}
                startIcon={<DeleteIcon />}
                onClick={clearAll}
              >
                Wyczyść koszyk
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="cart table">
                <TableHead>
                  <TableRow>
                    <TableCell>Produkt</TableCell>
                    <TableCell align="right" sx={{ pr: 4 }}>
                      Ilość
                    </TableCell>
                    <TableCell align="right">Cena za szt.</TableCell>
                    <TableCell align="right">Łącznie</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems &&
                    cartItems.map((item) => (
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
                        <TableCell align="right" sx={{ pr: 0 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "end",
                            }}
                          >
                            {item.quantity <= 1 ? (
                              <IconButton disabled sx={{ minWidth: 0 }}>
                                <RemoveIcon />
                              </IconButton>
                            ) : (
                              <IconButton sx={{ minWidth: 0 }}>
                                <RemoveIcon
                                  sx={{ color: "#1d9994" }}
                                  onClick={() => decreaseQuantity(item._id)}
                                />
                              </IconButton>
                            )}
                            <Typography variant="body2" sx={{ mx: 2 }}>
                              {item.quantity}
                            </Typography>
                            {item.stock <= item.quantity ? (
                              <IconButton disabled sx={{ minWidth: 0 }}>
                                <AddIcon />
                              </IconButton>
                            ) : (
                              <IconButton sx={{ minWidth: 0 }}>
                                <AddIcon
                                  sx={{ color: "#1d9994" }}
                                  onClick={() => increaseQuantity(item._id)}
                                />
                              </IconButton>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          {item.price.toFixed(2)} zł
                        </TableCell>
                        <TableCell align="right">
                          {(item.price * item.quantity).toFixed(2)} zł
                        </TableCell>
                        <TableCell align="right" sx={{ p: 0 }}>
                          <IconButton
                            onClick={() => clear(item._id)}
                            sx={{ color: "#df552b" }}
                          >
                            <ClearIcon></ClearIcon>
                          </IconButton>
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
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "space-between" },
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Box>
                <Link to="/">
                  <Button
                    size="large"
                    variant="outlined"
                    sx={{ borderColor: "#df552b", color: "#df552b", my: 2 }}
                  >
                    Powrót do strony głównej
                  </Button>
                </Link>
              </Box>
              <Box>
                <Link to="/checkout/confirmation">
                  <Button
                    size="large"
                    variant="contained"
                    sx={{ backgroundColor: "#1d9994", my: 2 }}
                  >
                    Przejdź do kasy
                  </Button>
                </Link>
              </Box>
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
                px: 6,
                py: 4,
                border: "2px solid #1d9994",
              }}
            >
              <img
                src="src/assets/emptyCart.png"
                alt="error"
                loading="lazy"
                className="w-50 h-50"
              />
              <Typography variant="h3" sx={{ textAlign: "center" }}>
                Ale tu pusto!
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "center", mx: 2 }}>
                Idź sobie coś kup :).
              </Typography>
              <Box display="flex" justifyContent="center">
                <Link to="/">
                  <Button
                    size="large"
                    variant="contained"
                    sx={{ backgroundColor: "#1d9994", my: 2 }}
                  >
                    Powrót do strony głównej
                  </Button>
                </Link>
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
    </>
  );
};

export default CartPage;
