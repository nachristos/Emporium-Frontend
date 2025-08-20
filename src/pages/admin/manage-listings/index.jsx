import { useState } from "react";
import { Loader } from "../../../components/shared/loader";
import { useListings } from "../../../hooks/use-listings";
import './index.css';
import { IconButton } from "../../../components/shared/icon-button";
import { EditIcon } from "../../../assets/icons/edit-icon";
import { EditListing } from "../listing/edit-listing";
import { Button } from "../../../components/shared/button";
import { CloseIcon } from "../../../assets/icons/close-icon";

export const ManageListings = () => {
  const { data, loading } = useListings();
  const [listing, setListing] = useState(false);

  if (!data || loading) {
    return <Loader />;
  }

  return (
    <>
      {listing ? (
        <div className="scrollable mt">
          <EditListing listing={listing} onClose={() => setListing(undefined)} />
        </div>
      ): (
      <div className="scrollable w-full center">
        <div className="w-full center">
          <h1 className="pri px">Manage Ads</h1>
        </div>
        <div className="w-full">
          <IconButton className={'close'} onClick={() => location.pathname = '/admin/'}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="item-row flex w-full pri">
          <div className="flex between w-full">
            <div className="name">
              <h3>{'Name'}</h3>
            </div>
            <div className="details">
              <h3>{'price'}</h3>
            </div>
            <div className="details">
              <h3>{'type'}</h3>
            </div>
            <div className="px"/>
          </div>
        </div>
        {data.map(listing => (
          <div key={listing._id} className="item-row flex w-full text">
            <div className="flex between w-full">
              <div className="name">
                <h3>{listing.itemId.name}</h3>
              </div>
              <div className="details">
                <h3>{`$${(Number(listing.itemId.price) / 100).toFixed(2)}`}</h3>
              </div>
              <div className="details">
                <h3>{`${listing.type}`}</h3>
              </div>
              <IconButton onClick={() => setListing(listing)}>
                <EditIcon />
              </IconButton>
            </div>
          </div>
        ))}
        <div className="mt py">
          <Button variant="primary" size="large" onClick={() => setListing({})}>
            Add New Ad
          </Button>
        </div>
      </div>
      )}
    </>
  );
}