import { useContext } from "react";
import { CartContext } from "../context/cart-context.jsx";

export const useCartContext = () => {
  const context = useContext(CartContext);
  return context;
};