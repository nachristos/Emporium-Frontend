import { CloseIcon } from '../../assets/icons/close-icon';
import { Button } from '../shared/button';
import { Quantity } from '../shared/quantity';
import placeHolderImg from '/weapon.png';
import { IconButton } from '../shared/icon-button';
import { useCartContext } from '../../hooks/use-cart-context';
import './index.css';
import { useMutate } from '../../hooks/use-mutate';

export const Cart = ({ ref, open, onClose, items }) => {
  const { updateItem, clearCart } = useCartContext();
  const { create } = useMutate('/payment', (resp) => {
    window.location.href = resp.url;
    clearCart();
  });
  
  const handleCheckout = () => {
    create(items.map((i) => ({
        name: i.item.name,
        price: i.item.price,
        quantity: i.quantity,
    })))
  };
  
  return (
    <div>
      <div ref={ref} onMouseLeave={onClose} className={`cart ${open ? 'open' : ''}`}>
        <div>
          <div className='close'>
            <IconButton onClick={onClose}><CloseIcon/></IconButton>
          </div>
          <div className='flex-col text center'>
            <h2 className="mb">Cart</h2>
            <div className="w-full divider mt"/>
            <div className='w-full'>
              {items?.map(i => (
                <div key={i.item?._id} className='pt'>
                  <div className="flex">
                    <img className="image" src={i.item?.imgURL || placeHolderImg} />
                    <div className="item-text flex-col w-full between" style={{ marginLeft: '12px' }}>
                      <div className="flex">
                        <h2 className='body'>
                          {i.item?.name}
                        </h2>
                      </div>
                      <div className="between">
                        <div className="end">
                          <Quantity value={i.quantity} onChange={(quantity) => updateItem(i.item?._id, quantity)} />
                        </div>
                        <div>
                          <Button size={'small'} variant={'tertiary'} onClick={() => updateItem(i.item?._id, 0)}>remove</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='w-full mb'>
            <Button className={'mb'} size={'large'} variant={'primary'} onClick={handleCheckout}>Checkout</Button>
        </div>
      </div>
    </div>
  )
}