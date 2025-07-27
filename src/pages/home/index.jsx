import { useItems } from "../../hooks/use-items";
import './index.css';
import { ItemCard } from "./item-card";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetails } from "./item-details";

export const Home = () => {
  const { itemId } = useParams();
  const { data, isLoading } = useItems();
  const [selectedItemId, setSelectedItemId] = useState(itemId || undefined)

  
  const selectedItem = useMemo(() => data?.find(d => d._id === selectedItemId), [data, selectedItemId])  
  
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
  
  return (
    <div className="scrollable">
      { selectedItemId ? (
        <ItemDetails item={selectedItem} onClose={handleClose} />
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