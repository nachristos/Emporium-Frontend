import { useState } from "react";
import { Input } from "../../../components/shared/input";
import { ImageIcon } from "../../../assets/icons/image-icon";
import { UploadIcon } from "../../../assets/icons/upload-icon";
import { useMutate } from "../../../hooks/use-mutate";
import { Button } from "../../../components/shared/button";
import './index.css';
import { useQueryClient } from "@tanstack/react-query";
import { usePurchases } from "../../../hooks/use-purchases";

export const ViewPurchase = ({ purchase, onClose, onUpdate }) => {
  const queryClient = useQueryClient();
  const data  = JSON.parse(purchase.purchase); 
  
  return (
    <div className="w-full listing-edit p">
      <div className="">
        <div className="mb">
            <div>
              <Input placeholder={'Customer Email'} value={purchase.customerEmail} readOnly />
            </div>
            <div className="w-full p">
              <h3>Items: </h3>
              {data.map((p, index )=> (
                <div className="w-full p">
                    <Input value= {` Item ${index + 1}:`}  readonly />
                    <Input value= {`${p.iname}`}  readonly />
                    <Input value= {`Quantity: ${p.quantity}`}  readonly />
                    <Input value= {`Price: $${(p.amount/100).toFixed(2)} each`}  readonly />
                </div>
                
              ))}
            </div>
            <div>
              <Input placeholder={'Total'} value={(purchase.total/100).toFixed(2)} readOnly />
            </div>
        </div>
        <div className="flex between">
            <div>
              <Button variant="secondary" className="w-full" onClick={onClose}>
                Back
              </Button>
            </div>
          </div>
      </div>
    </div>  
  )
}