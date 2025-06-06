import StudentServicesSection from "../StudentServicesSection";
import PartnerSection from "../PartnerSection";
import "./style.css";
import Image from "next/image";
interface Props {
  isAuthenticated: boolean;
}
function ServiceAudience({isAuthenticated}: Props) {
  if (isAuthenticated) return null;

  return (
    <div className="main-content-container">
      <p className="main-heading-style">Кому пригодится сервис?</p>
      <div className="feature-highlight-section1">
        <div className="feature-highlight-section">
          <StudentServicesSection />
          <div className="promo-banner">
            <Image 
              width={250}
              height={210}
            src="/icons/ServiceAudience/yellow.svg" alt="" className="image-container4" />
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
