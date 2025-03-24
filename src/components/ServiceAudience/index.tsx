import StudentServicesSection from "../StudentServicesSection";
import PartnerSection from "../PartnerSection";
import YellowSvg from "../../../public/icons/ServiceAudience/YellowSvg"
import "./style.css";

function ServiceAudience() {
  return (
    <div className="main-content-container">
      <p className="main-heading-style">Кому пригодится сервис?</p>
      <div className="feature-highlight-section1">
        <div className="feature-highlight-section">
          <StudentServicesSection />
          <div className="promo-banner">
            {/* <img src="/icons/ServiceAudience/yellow.svg" alt="" className="image-container4" /> */}
            <YellowSvg className="image-container4" />
          </div>
        </div>
        <div className="partner-offers-section">
          <PartnerSection />
        </div>
      </div>
    </div>
  );
}

export default ServiceAudience;
