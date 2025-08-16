import { useItems } from "../../hooks/use-items";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/shared/loader";
import { ItemCard } from "../../components/shared/item-card";
import { ItemDetails } from "../../components/shared/item-details";
import { getCategory, setSearch } from "../../utils/searchParams";
import './index.css';

export const Shop = () => {
  const { itemId } = useParams();
  const [category, setCategory] = useState(getCategory());
  const { data, isLoading } = useItems();
  const [selectedItemId, setSelectedItemId] = useState(itemId || undefined)
  
  const categories = useMemo(() => {
    const set = new Set();
    data?.map(d => set.add(d.category));
    return [...set];
  },[data])

  const selectedItem = useMemo(() => data?.find(d => d.slug === selectedItemId), [data, selectedItemId])  
  const filteredItems = useMemo(() => category ? data?.filter(d => d.category === category) : data, [data, category])  
  
  if (!data && isLoading) {
    return  <Loader />;
  }
  
  const handleClick = (id) => {
    setSelectedItemId(id)
    history.replaceState(null, id, `/shop/${id}`)
  }
  
  const handleClose = () => {
    setSelectedItemId(undefined)
    history.replaceState(null, 'home', `/shop/`)
  }
  
  const handleSetCategory = (c) => {
    setCategory(c);
    setSearch('category', c)
  }
  
  return (
    <div className="scrollable">
      { selectedItemId ? (
        <ItemDetails item={selectedItem} onClose={handleClose} />
      ) : (
        <div className="shop">
          <div className="w-full center">
            <h1 className="pri">Shop All</h1>
          </div>

          <div className="flex w-full center mb">
            <select className="filter" name="cars" id="cars" onChange={v => handleSetCategory(v.currentTarget.value)}>
              <option value={''}>{'All'}</option>
              {categories.map(cat => (
              <option selected={cat === category} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="w-full wrap center">
            {filteredItems.map(item => (
              <ItemCard key={item._id} item={item} onClick={handleClick} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}