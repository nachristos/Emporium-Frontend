import { useMutate } from "../../../hooks/use-mutate";
import { Button } from "../../../components/shared/button";
import './index.css';
import { useQueryClient } from "@tanstack/react-query";

export const ViewPurchase = ({ purchase, onClose }) => {
  const queryClient = useQueryClient();
  const data  = JSON.parse(purchase.purchase); 
  let status = purchase.shipped;
  const disabled = purchase.shipped;

  if (purchase.shipped === true) {
    status = 'Shipped';
  } else {status = 'Awaiting shipping'}

  const { update } = useMutate(`/purchase/${purchase._id || ''}`, () => {
        queryClient.invalidateQueries(['purchases']);
    });

   const handleSubmit = () => {
    update({
      ...purchase,
      shipped: true,
    })
    onClose();
  }
  
  return (
    <div className="w-full listing-edit p">
      <div className="">
        <div className="mb">
            <div className="w-full heading"> 
                <h3 className="pri">Status</h3>
                <h4 className="strong text px">{status}</h4>
            </div>
            <div className="w-full  heading mt"> 
                <h3 className="pri">Customer Email</h3>
                <h4 className="strong text px">{purchase.customerEmail}</h4>
            </div>
            <div className="w-full  heading">
              <h3 className="pri mt">Purchased Items</h3>
              <div>
                {data.map((p, index )=> (
                  <div className="px text">
                      <div className="flex">
                          <h3 className="strong">{` Item ${index + 1}: ${p.iname}`}</h3>
                      </div>
                      <h4 className="strong">{`Quantity: ${p.quantity}`}</h4>
                      <h4 className="strong">{`Price: $${(p.amount/100).toFixed(2)} each`}</h4>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full flex  heading between mt">
                <h3 className="pri">Total: </h3>
                <h3 className="text">&nbsp;{`$${(purchase.total/100).toFixed(2)}`}</h3>
            </div>
        </div>
        <div className="flex between">
            <div>
              <Button variant="secondary" className="w-full" onClick={onClose}>
                Back
              </Button>
            </div>
            <div>
              { !purchase.shipped && (
              <Button disabled={disabled} variant="primary" className="w-full" onClick={handleSubmit}>
                Mark As Shipped
              </Button>
              )}
            </div>
          </div>
      </div>
    </div>  
  )
}