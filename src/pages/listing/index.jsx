import { useListings } from "../../hooks/use-listings";
import { ListingCard } from "./listing-card";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ListingDetails } from "./listing-details";
import ImageCarousel from "../../components/shared/image-carousel";
import './index.css'

export const Listing = () => {
  const { listingId } = useParams();
  const { data, isLoading } = useListings();
  const [selectedListingId, setSelectedListingId] = useState(listingId || undefined)
  
  const selectedListing = useMemo(() => data?.find(d => d._id === selectedListingId), [data, selectedListingId])  
  
  if (!data && isLoading) {
    return <div>Loading content...</div>;
  }
  
  const handleClick = (id) => {
    setSelectedListingId(id)
    history.replaceState(null, id, `/listing/${id}`)
  }
  
  const handleClose = () => {
    setSelectedListingId(undefined)
    history.replaceState(null, 'listing', `/listing/`)
  }

  // Listings Image slides
  const slides = [
    //{imgURL: selectedListing.imgURL, title: selectedListing.name}, 
    {imgURL: "https://storage.googleapis.com/emporium-images/68877a48a1d44ac06fc50277_01.png", 
      title: "Heart-Shaped Spy Goggles"
    },
    {imgURL: "https://storage.googleapis.com/emporium-images/68877850a1d44ac06fc50270_01.png",
      title: "Fart Gun"
    },
    {imgURL: "https://storage.googleapis.com/emporium-images/68877658a1d44ac06fc5026a_01.png",
      title: "Boogie Robots"
    }
  ]
  
  return (
    <div className= 'img-container'>
      { selectedListingId ? (
        <ListingDetails listing={selectedListing} onClose={handleClose} />
      ) : (
          <ImageCarousel slides={slides} />
      )}
    </div>
  );
}