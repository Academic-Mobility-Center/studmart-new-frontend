import LoyaltySystemPresentation from "../LoyaltySystemPresentation";
import ImageGallery from "../ImageGallery";
import "./style.css";

function MarketingContentBlock() {
  return (
    <div className="loyalty-program-info-container">
      <p className="loyalty-program-heading-style">Про Студмарт</p>
      <div className="loyalty-program-info-container1">
        <LoyaltySystemPresentation />
        <ImageGallery /> 
      </div>
    </div>
  );
}

export default MarketingContentBlock;
