import { useListings } from "../../hooks/use-listings";
import { ListingCard } from "./listing-card";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ListingDetails } from "./listing-details";

export const Home = () => {
  const { listingId } = useParams();
  const { data, isLoading } = useListings();
  const [selectedListingId, setSelectedListingId] = useState(listingId || undefined)

  
  const selectedListing = useMemo(() => data?.find(d => d._id === selectedListingId), [data, selectedListingId])  
  
  if (!data && isLoading) {
    return <div>Loading user context...</div>;
  }
  
  const handleClick = (id) => {
    setSelectedListingId(id)
    history.replaceState(null, id, `/listing/${id}`)
  }
  
  const handleClose = () => {
    setSelectedListingId(undefined)
    history.replaceState(null, 'listing', `/listing/`)
  }
  
  return (
    <div className="scrollable">
      { selectedListingId ? (
        <ListingDetails listing={selectedListing} onClose={handleClose} />
      ) : (
        <div className="w-full wrap center">
          <>stuff</>
          {data.map(listing => (
            <ListingCard key={listing._id} listing={listing} onClick={handleClick} />
          ))}
        </div>
      )}
    </div>
  );
}