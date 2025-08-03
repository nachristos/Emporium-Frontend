import { CardBase } from "../../../components/shared/card-base";
import placeholderImg from "/weapon.png";
import './index.css';

export const ItemCard = ({ item, onClick }) => {
  
  return (
    <div id={item._id} className="item-card">
      <a onClick={() => onClick(item._id)}>
        <CardBase>
          <div>
            <img src={item.imgURL || placeholderImg} />
          </div>
          <h2 className="body text mb">
            {item.name}
          </h2>
        </CardBase>
      </a>
    </div>
  )
}