import { CardBase } from "../../components/shared/card-base"

export const ItemCard = ({ item, onClick }) => {
  
  return (
    <div id={item._id} className="item-card">
      <a onClick={() => onClick(item._id)}>
        <CardBase>
          <div className="" >
            <img src="/weapon.png" />
          </div>
          <h2 className="body text mb p">
            {item.name}
          </h2>
        </CardBase>
      </a>
    </div>
  )
}