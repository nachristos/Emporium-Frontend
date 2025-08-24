import { Input } from "../../../components/shared/input";
import { Button } from "../../../components/shared/button";
import './index.css';
import { useQueryClient } from "@tanstack/react-query";

export const ViewPurchase = ({ purchase, onClose, onUpdate }) => {
  const queryClient = useQueryClient();
  const data  = JSON.parse(purchase.purchase); 
  
  return (
    <div className="w-full listing-edit p">
      <div className="">
        <div className="mb">
            <div className="w-full  heading"> 
                <h3 >Customer Email: </h3>
                <h4 className="strong text">{purchase.customerEmail}</h4>
            </div>
            <div className="w-full  heading">
              <h3>Purchased Items: </h3>
              {data.map((p, index )=> (
                <div className="p text">
                    <div className="flex">
                        <h3 className="strong">{` Item ${index + 1}: ${p.iname}`}</h3>
                    </div>
                    <h4 className="strong">{`Quantity: ${p.quantity}`}</h4>
                    <h4 className="strong">{`Price: $${(p.amount/100).toFixed(2)} each`}</h4>
                </div>
                
              ))}
            </div>
            <div className="w-full  heading">
                <h3>Total: </h3>
                <h4 className="strong text">{(purchase.total/100).toFixed(2)}</h4>
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