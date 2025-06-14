import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import Confirmation from "../pages/CheckoutPage";
import OrderConfirmation from "../pages/SuccessfulPaymentPage";
import CancelPayment from "../pages/CancelPaymentPage"
import ProductPage from "../pages/ProductPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout/confirmation" element={<Confirmation />} />
      <Route path="/order-successful" element={<OrderConfirmation />} />
      <Route path="/order-cancelled" element={<CancelPayment />} />
      <Route path="/products/:productId" element={<ProductPage />} />
    </Routes>
  );
}
