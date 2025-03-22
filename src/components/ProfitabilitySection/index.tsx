import ProfitabilitySvg from "../../../public/icons/PartnerServicesSection/ProfitabilitySvg";
import "./style.css";

function ProfitabilitySection() {
  return (
    <div className="cost-section-container">
      <ProfitabilitySvg className="discount-image" />
      {/* <img src="/assets/image_96db7297.png" alt="" className="discount-image" /> */}
      <p className="discount-offer-heading">Окупаемая стоимость</p>
    </div>
  );
}

export default ProfitabilitySection;
