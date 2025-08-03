import { createContext } from "react";

export const CartContext = createContext({
  open: () => {},
  updateItem: () => {},
  cart: {}
});