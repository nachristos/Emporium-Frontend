import { useEffect, useState } from "react";
import { addItems, getItemCount } from "../../utils/cart";
import image from '/weapon.png';
import { IconButton } from "../../components/shared/icon-button";
import { EditIcon } from "../../assets/icons/edit-icon";
import { CloseIcon } from "../../assets/icons/close-icon";
import { ChevDown } from "../../assets/icons/chev-down";
import { Quantity } from "./quantity";
import { Button } from "../../components/shared/button";

export const ItemDetails = ({ item, onClose }) => {
  
  const [description, setDescription] = useState(false);
  const [details, setDetails] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState();
  const [edit, setEdit] = useState(false);
  
    useEffect(() => {
    setCartItems(getItemCount(item._id))
  },[item._id])
  
  const handleSetQuantity = (v) => {
    const value = v <= item?.stock ? v : item?.stock;
    setQuantity(value);
  }
    
  const handleAddToCart = () => {
    addItems(item._id, quantity);
    setCartItems(getItemCount(item._id))
  }
  
  return (
      <>
        {edit ? 
        (
        <EditItem item={item} onClose={() => setEdit(false)} />
        ):(
        <>
          <div className="flex between">
            <IconButton className={'close'} onClick={onClose}>
              <CloseIcon />
            </IconButton>
            <IconButton className={'close'} onClick={() => setEdit(true)}>
              <EditIcon />
            </IconButton>
          </div>
            <div className="w-full item-page">
              <img className="image" src={image} /> 
              <div className="p">
                <div className="mb">
                  <h2>
                    {item.name}
                  </h2>
                </div>
                <div className="divider between text strong py">
                  <h3>
                    ${Number(item.price / 100).toFixed(2)}
                  </h3>
                  <h3>
                    {`${item.stock} in stock`}
                  </h3>
                </div>
                <div className="between text strong">
                  <Quantity value={quantity} onChange={handleSetQuantity} />
                  {`${cartItems} in cart`}
                </div>
                <div className="py">
                  <Button onClick={handleAddToCart} variant={'primary'} size="large" >Add to cart</Button>
                </div>
              </div>
              <div className="divider" />
              <div className="text px">
                <div className="between pt">
                  <h3 className="heading" style={{ textwrap: 'balance'}}>
                    Product specifications
                  </h3>
                  <IconButton onClick={() => setDescription(!description)}>
                    <ChevDown active={description} />
                  </IconButton>
                </div>
                <div className="mb">
                  { description && (
                    <div className="body mx">
                      <p>
                        {item.attributes}
                      </p>
                    </div>
                  )}
                </div>
                <div className="between divider pt">
                  <h3 className="heading">
                    Product details
                  </h3>
                  <IconButton onClick={() => setDetails(!details)}>
                    <ChevDown active={details} />
                  </IconButton>
                </div>
                <div className="mb">
                  { details && (
                    <div className="body mx">
                      <p>
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
    </>
  )
}