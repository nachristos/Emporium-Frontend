import { CardBase } from "../../../components/shared/card-base";
import placeholderImg from "/weapon.png";
import './index.css';

export const ListingCard = ({ listing, onClick }) => {
  
  return (
    <div id={listing._id} className="listing-card">
      <a onClick={() => onClick(listing._id)}>
        <CardBase>
          <div>
            <img src={listing.imgURL || placeholderImg} />
          </div>
          <h2 className="body text mb">
            {listing.name}
          </h2>
        </CardBase>
      </a>
    </div>
  )
}