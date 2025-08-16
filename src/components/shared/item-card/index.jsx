import { CardBase } from "../../../components/shared/card-base";
import placeholderImg from "/weapon.png";
import './index.css';
import { useCartContext } from "../../../hooks/use-cart-context";

export const ItemCard = ({ item, onClick }) => {
  const { updateItem, open, cart } = useCartContext();

  const handleAddToCart = () => {
    updateItem(item._id, (cart[item._id] || 0) + 1)
    open();
  }
  
  return (
    <div id={item._id} className="item-card">
      <a onClick={() => onClick(item.slug)}>
        <CardBase>
          <div>
            <img src={item.imgURL || placeholderImg} />
          </div>
          <h2 className="body text mb">
            {item.name}
          </h2>
        </CardBase>
      </a>
      <button className={'add-button'} onClick={handleAddToCart}><h3>+</h3></button>
    </div>
  )
}