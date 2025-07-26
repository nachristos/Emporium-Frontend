import { useItems } from "../../hooks/use-items";
import './index.css';
import { ItemCard } from "./item-card";
import { useEffect, useMemo, useState } from "react";
import image from '/weapon.png';
import { Button } from "../../components/shared/button";
import { Quantity } from "./quantity";
import { ChevDown } from "../../assets/icons/chev-down";
import { IconButton } from "../../components/shared/icon-button";
import { CloseIcon } from "../../assets/icons/close-icon";
import { useParams } from "react-router-dom";
import { addItems, getItemCount } from "../../utils/cart";
import { EditIcon } from "../../assets/icons/edit-icon";
import { EditItem } from "../admin/item/edit-item";

export const Home = () => {
  const { itemId } = useParams();
  const { data, isLoading } = useItems();
  const [selectedItemId, setSelectedItemId] = useState(itemId || undefined)
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState(false);
  const [details, setDetails] = useState(false);
  const [cartItems, setCartItems] = useState();
  const [edit, setEdit] = useState(false);
  
  const selectedItem = useMemo(() => data?.find(d => d._id === selectedItemId), [data, selectedItemId])  
  
  useEffect(() => {
    setCartItems(getItemCount(itemId))
  },[itemId])
  
  if (!data && isLoading) {
    return <div>Loading user context...</div>;
  }
  
  const handleClick = (id) => {
    setSelectedItemId(id)
    history.replaceState(null, id, `/home/${id}`)
  }
  
  const handleClose = () => {
    setSelectedItemId(undefined)
    history.replaceState(null, 'home', `/home/`)
  }
  
  const handleSetQuantity = (v) => {
    const value = v <= selectedItem?.stock ? v : selectedItem?.stock;
    setQuantity(value);
  }
  
  const handleAddToCart = () => {
    addItems(selectedItem._id, quantity);
    setCartItems(getItemCount(selectedItemId))
  }
  
  return (
    <div className="scrollable">
      { selectedItemId ? (
          <>
            {edit ? 
            (
            <EditItem item={selectedItem} onClose={() => setEdit(false)} />
            ):(
            <>
              <div className="flex between">
                <IconButton className={'close'} onClick={handleClose}>
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
                        {selectedItem.name}
                      </h2>
                    </div>
                    <div className="divider between text strong py">
                      <h3>
                        ${Number(selectedItem.price / 100).toFixed(2)}
                      </h3>
                      <h3>
                        {`${selectedItem.stock} in stock`}
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
                      <h3 className="heading">
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
                            {selectedItem.description}
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
                            {selectedItem.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
        </>
      ) : (
        <div className="w-full wrap center">
          {data.map(item => (
            <ItemCard key={item._id} item={item} onClick={handleClick} />
          ))}
        </div>
      )}
    </div>
  );
}