import { useState } from "react";
import placeholderImg from '/weapon.png';
import { IconButton } from "../../../components/shared/icon-button";
import { EditIcon } from "../../../assets/icons/edit-icon";
import { CloseIcon } from "../../../assets/icons/close-icon";
import { ChevDown } from "../../../assets/icons/chev-down";
import { Button } from "../../../components/shared/button";
import { EditListing } from '../../admin/item/edit-listing';
import { Quantity } from "../../../components/shared/quantity";
import { useCartContext } from "../../../hooks/use-cart-context";
import './index.css';

export const ListingDetails = ({ listing, onClose }) => {
  const { updateListing, open } = useCartContext();
  const [description, setDescription] = useState(false);
  const [details, setDetails] = useState(false);
  const [edit, setEdit] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const handleSetQuantity = (v) => {
    const value = v <= listing?.stock ? v : listing?.stock;
    setQuantity(value);
  }
    
  const handleAddToCart = () => {
    updateListing(listing._id, quantity)
    open();
  }
  
  return (
      <>
        {edit ? 
        (
        <EditListing listing={listing} onClose={() => setEdit(false)} />
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
            <div className="w-full listing-page">
              <img className="image" src={listing.imgURL || placeholderImg} /> 
              <div>
                <div className="p">
                  <div className="mb">
                    <h2>
                      {listing.name}
                    </h2>
                  </div>
                  <div className="divider between text strong py">
                    <h3>
                      ${Number(listing.price / 100).toFixed(2)}
                    </h3>
                    <h3>
                      {`${listing.stock} in stock`}
                    </h3>
                  </div>
                  <div className="between text strong">
                    <Quantity value={quantity} onChange={handleSetQuantity} />
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
                      <div className="body mx p">
                        <p>
                          {listing.attributes}
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
                      <div className="body mx p">
                        <p>
                          {listing.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
    </>
  )
}