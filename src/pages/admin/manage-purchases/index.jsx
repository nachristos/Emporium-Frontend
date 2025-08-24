import { useState } from "react";
import { Loader } from "../../../components/shared/loader";
import { usePurchases } from "../../../hooks/use-purchases";
import './index.css';
import { IconButton } from "../../../components/shared/icon-button";
import { EditIcon } from "../../../assets/icons/edit-icon";
import { ViewPurchase } from "../purchase/view-purchase";
import { Button } from "../../../components/shared/button";
import { CloseIcon } from "../../../assets/icons/close-icon";

export const ManagePurchases = () => {
  const { data, loading } = usePurchases();
  const [purchase, setPurchase] = useState(false);

  if (!data || loading) {
    return <Loader />;
  }

  return (
    <>
      {purchase ? (
        <div className="scrollable mt">
          <ViewPurchase purchase={purchase} onClose={() => setPurchase(undefined)} />
        </div>
      ): (
      <div className="scrollable w-full center">
        <div className="w-full center">
          <h1 className="pri px">Review Purchases</h1>
        </div>
        <div className="w-full">
          <IconButton className={'close'} onClick={() => location.pathname = '/admin/'}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="item-row flex w-full pri">
          <div className="flex between w-full">
            <div className="name">
              <h3>{'Date'}</h3>
            </div>
            <div className="name">
              <h3>{'Customer Email'}</h3>
            </div>
            <div className="details">
              <h3>{'Total'}</h3>
            </div>
            <div className="px"/>
          </div>
        </div>
        {data.map(purchase => (
          <div key={purchase._id} className="item-row flex w-full text">
            <div className="flex between w-full">
              <div className="name">
                <h3>{(purchase.createdAt).replace(/T/, ' ').replace(/\..+/, '')}</h3>
              </div>
              <div className="name">
                <h3>{purchase.customerEmail}</h3>
              </div>
              <div className="details">
                <h3>{`${(purchase.total/100).toFixed(2)}`}</h3>
              </div>
              
              <IconButton onClick={() => setPurchase(purchase)}>
                <Button size={'small'} variant={'secondary'} >view</Button>
              </IconButton>
            </div>
          </div>
        ))}
      </div>
      )}
    </>
  );
}