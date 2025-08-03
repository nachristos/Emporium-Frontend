import { useMemo, useRef, useState } from "react";
import { CartContext } from ".";
import { IconButton } from "../../components/shared/icon-button";
import { CloseIcon } from "../../assets/icons/close-icon";
import './index.css';
import { getItems, updateItem } from "../../utils/cart";
import { useItems } from "../../hooks/use-items";
import placeHolderImg from '/weapon.png';
import { Quantity } from "../../components/shared/quantity";
import { Button } from "../../components/shared/button";

export const CartContextProvider = ({ children }) => {
  const [open, setOpen] = useState();
  
  const ref = useRef(null);
  const [cart, setCart] = useState(getItems() || {});
  const { data } = useItems();
  
  const handleOpen = () => {
    setOpen(!open);
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
        <div>
          <div ref={ref} onMouseLeave={() => setOpen(false)} className={`cart ${open ? 'open' : ''}`}>
            <div className='close'>
              <IconButton onClick={() => setOpen(false)}><CloseIcon/></IconButton>
            </div>
            <div className='flex-col text center'>
            <h2 className="mb">Cart</h2>
            <div className="w-full divider mt"/>
              <div className='w-full'>
                {items?.map(i => (
                  <div key={i.item?._id} className='pt'>
                    <div className="flex">
                      <img className="image" src={i.item?.imgURL || placeHolderImg} />
                      <div className="flex-col w-full between" style={{ marginLeft: '12px' }}>
                        <div className="flex">
                          <h2 className='body'>
                            {i.item?.name}
                          </h2>
                        </div>
                        <div className="between">
                          <div className="end">
                            <Quantity value={i.quantity} onChange={(quantity) => handleSetQuantity(i.item?._id, quantity)} />
                          </div>
                          <div>
                            <Button size={'small'} variant={'tertiary'} onClick={() => handleSetQuantity(i.item?._id, 0)}>remove</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {children}
    </CartContext.Provider>
  );
}