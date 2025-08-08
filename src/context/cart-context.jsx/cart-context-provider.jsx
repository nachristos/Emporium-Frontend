import { useMemo, useRef, useState } from "react";
import { CartContext } from ".";
import { getItems, updateItem } from "../../utils/cart";
import { useItems } from "../../hooks/use-items";
import { Cart } from "../../components/cart";

export const CartContextProvider = ({ children }) => {
  const [open, setOpen] = useState();
  
  const ref = useRef(null);
  const [cart, setCart] = useState(getItems() || {});
  const { data } = useItems();
  
  const handleOpen = () => {
    setOpen(true);
    ref.current.focus();
  }
  
  const itemsMap = useMemo(() => Object.fromEntries(data?.map(d => [d._id, d]) || []), [data])
  
  const updateCart = (id, count) => {
    setCart({ ...cart, [id]: count })
  }
  
  const handleSetQuantity = (id, count) => {
    const item = itemsMap[id];
    const newCount = count <= item?.stock ? count : item?.stock;
    updateCart(id, newCount);
    updateItem(id, count);
  }
  
  const items = useMemo(() => {
    const cartItems = Object.entries(cart);
    return cartItems.filter(([,v]) => !!v).map(([key, value]) => ({ item: itemsMap[key], quantity: value }))
  },[cart, itemsMap])

  return (
    <CartContext.Provider value={{ open: handleOpen, updateItem: handleSetQuantity, cart }}>
        <Cart ref={ref} open={open} onClose={() => setOpen(false)} items={items}/>
        {children}
    </CartContext.Provider>
  );
}