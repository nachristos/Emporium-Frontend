import { useState } from "react";
import { Loader } from "../../../components/shared/loader";
import { useItems } from "../../../hooks/use-items";
import './index.css';
import { IconButton } from "../../../components/shared/icon-button";
import { EditIcon } from "../../../assets/icons/edit-icon";
import { EditItem } from "../item/edit-item";
import { Button } from "../../../components/shared/button";
import { CloseIcon } from "../../../assets/icons/close-icon";

export const ManageItems = () => {
  const { data, loading } = useItems();
  const [item, setItem] = useState(false);

  if (!data || loading) {
    return <Loader />;
  }

  return (
    <>
      {item ? (
        <div className="scrollable mt">
          <EditItem item={item} onClose={() => setItem(undefined)} />
        </div>
      ): (
      <div className="scrollable w-full mt">
        <div className="w-full center">
          <h1 className="pri px">Manage Items</h1>
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
              <h3>{'stock'}</h3>
            </div>
            <div className="px"/>
          </div>
        </div>
        {data.map(item => (
          <div key={item._id} className="item-row flex w-full text">
            <div className="flex between w-full">
              <div className="name">
                <h3>{item.name}</h3>
              </div>
              <div className="details">
                <h3>{`$${(Number(item.price) / 100).toFixed(2)}`}</h3>
              </div>
              <div className="details">
                <h3>{`${item.stock}`}</h3>
              </div>
              <IconButton onClick={() => setItem(item)}>
                <EditIcon />
              </IconButton>
            </div>
          </div>
        ))}
        <div className="mt py center">
          <Button className={'new-item-button'} variant="primary" size="large" onClick={() => setItem({})}>
            Add New Item
          </Button>
        </div>
      </div>
      )}
    </>
  );
}