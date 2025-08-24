import { useState } from "react";
import placeholderImg from '/weapon.png';
import { IconButton } from "../../../components/shared/icon-button";
import { CloseIcon } from "../../../assets/icons/close-icon";
import { ChevDown } from "../../../assets/icons/chev-down";
import { Button } from "../../../components/shared/button";
import { Quantity } from "../../../components/shared/quantity";
import { useCartContext } from "../../../hooks/use-cart-context";
import './index.css';
import { EditItem } from "../../../pages/admin/item/edit-item";
import { EditIcon } from "../../../assets/icons/edit-icon";
import { AuthWrapper } from "../auth-wrapper";
import { Rating } from "../rating";
import { Ratings } from "./ratings";

export const ItemDetails = ({ item, onClose, onUpdate }) => {
  const { updateItem, open, cart } = useCartContext();
  const [description, setDescription] = useState(window.innerWidth > 1000 || false);
  const [details, setDetails] = useState(window.innerWidth > 1000 || false);
  const [edit, setEdit] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const handleSetQuantity = (v) => {
    const value = v <= item?.stock ? v : item?.stock;
    setQuantity(value);
  }
    
  const handleAddToCart = () => {
    updateItem(item._id, (cart[item._id] || 0) + quantity)
    open();
  }
  
  const FormatText = ({ textArray }) => (
    <p>
      {textArray.split('• ').map((i) => (
        <>
          { !!i.length && (
            <div className="text-block">
                <>
                  <div>
                  •
                  </div>
                  <div style={{ marginLeft: '8px' }}>
                    {i}
                  </div>
                </>
            </div>
          )}
        </>
      ))}
    </p>
  )
  
  return (
      <>
        {edit ? 
        (
        <EditItem item={item} onClose={() => setEdit(false)} onUpdate={onUpdate} />
        ):(
        <>
          <div className="flex between pxs">
            <IconButton className={'close'} onClick={onClose}>
              <CloseIcon />
            </IconButton>
            <AuthWrapper>
              <IconButton className={'close'} onClick={() => setEdit(true)}>
                <EditIcon />
              </IconButton>
            </AuthWrapper>
          </div>
            <div className="item-page">
              <div className="flex wrap middle">
                <img className="image" src={item.imgURL || placeholderImg} /> 
                <div className="info p flex-col middle">
                  <div className="mb">
                    <h2 className="heading">
                      {item.name}
                    </h2>
                    <div>
                      <Rating ratings={item.ratings} />
                    </div>
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
                  </div>
                  <div className="py mt">
                    <Button onClick={handleAddToCart} variant={'primary'} size="large" >Add to cart</Button>
                  </div>
                </div>
              </div>
              <div className="flex wrap middle">
                <div className="info text px">
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
                      <div className="body p">
                        <FormatText textArray={item.attributes} />
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
                      <div className="body p">
                          <FormatText textArray={item.description} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="info reviews text px">
                  <div className="divider pt">
                    <Ratings item={item} ratings={item.ratings} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
    </>
  )
}