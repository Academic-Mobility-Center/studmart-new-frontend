import MoneySvg from "../../../public/icons/StudentServicesSection/MoneySvg";
import "./style.css";

function FreeOfferBlock() {
  return (
    <div className="discount-offer-container">
      <MoneySvg className="discount-image" />
      <p className="discount-offer-heading">Бесплатно</p>
    </div>
  );
}

export default FreeOfferBlock;
