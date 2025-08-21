import { useItems } from "../../hooks/use-items";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/shared/loader";
import { ItemCard } from "../../components/shared/item-card";
import { ItemDetails } from "../../components/shared/item-details";
import { Listing } from "../../components/listing";
import './index.css';
import { Button } from "../../components/shared/button";


export const Home = () => {
  const { itemId } = useParams();
  const { data, isLoading } = useItems();
  const [selectedItemId, setSelectedItemId] = useState(itemId || undefined)

  
  const selectedItem = useMemo(() => data?.find(d => d.slug === selectedItemId), [data, selectedItemId])  
  
  const featuredItems = useMemo(() => {
    const itemsByCategory = data?.reduce((a, i) =>{
      return {...a, [i.category]: i }
    }, {}) || [];
    return Object.values(itemsByCategory).slice(0, 5);
  },[data]);
  
  if (!data && isLoading) {
    return  <Loader />;
  }
  
  if (selectedItemId && !selectedItem) {
    return <Loader />;
  }
  
  const handleClick = (id) => {
    setSelectedItemId(id)
    history.replaceState(null, id, `/home/${id}`)
  }
  
  const handleClose = () => {
    setSelectedItemId(undefined)
    history.replaceState(null, 'home', `/home/`)
  }
  
  const handleViewAll = () => {
    window.location.href = '/shop'
  }
  
  return (
    <div className="home scrollable">
      { selectedItemId ? (
        <ItemDetails item={selectedItem} onClose={handleClose} onUpdate={handleClick} />
      ) : (
        <>
          <Listing/>
          <div className="p">
            <h2 className="sec">Explore gadgets</h2>
          </div>
          <div className="">
            <div className="x-scroll">
              <div className="flex">
              {featuredItems?.map(item => (
                <div className="mx">
                  <ItemCard key={item._id} item={item} onClick={handleClick} />
                </div>
              ))}
              </div>
            </div>
          </div>
          <div className="flex p center mt">
            <Button onClick={handleViewAll} className="view-all-button" variant="primary" size="large">View all items</Button>
          </div>
        </>
      )}
    </div>

  );
}