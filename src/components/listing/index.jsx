import { useListings } from "../../hooks/use-listings";
import ImageCarousel from "../shared/image-carousel";
import './index.css';

// Export----------------------------------------------------------------------------------------------------
export const Listing = () => {
  // Params
  const { data, isLoading } = useListings();
 
  // Loading message
  if (!data && isLoading) {
    return <div>Loading content...</div>;
  }
  
  // Handlers
  const handleClick = (id) => {
    window.location.href = `/shop/${id}`
  }
  
  // Listings (Ads) Image slides
  const slides = data.map(listing => ({
     imgURL: listing.itemId.imgURL, title: listing.itemId.name, slug: listing.itemId.slug
  }))
  
  // Display
  return (
        <ImageCarousel slides={slides} onClick={handleClick}/>  
  );
}