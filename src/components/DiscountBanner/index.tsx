import "./style.css";
import ProcentSvg from "../../../public/icons/StudentServicesSection/ProcentSvg";
function DiscountBanner() {
  return (
    <div className="discount-offer-container">
      <ProcentSvg className="discount-image" />
      <p className="discount-offer-heading">Получаешь скидку 5–30%</p>
    </div>
  );
}

export default DiscountBanner;
