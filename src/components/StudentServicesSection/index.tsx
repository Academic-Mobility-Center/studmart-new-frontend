import { Button } from "@mui/base";
import DiscountBanner from "../DiscountBanner";
import ReferralSection from "../ReferralSection";
import FreeOfferBlock from "../FreeOfferBlock";
import ForeignStudentAccess from "../ForeignStudentAccess";
import "./style.css";

function StudentServicesSection() {
  return (
    <div >
      <div className="student-benefit-card">
        <p className="student-title-heading">Студентам</p>
        <div className="student-offers-container">
          <DiscountBanner />
          <ReferralSection />
        </div>
        <div className="student-benefits-section">
          <FreeOfferBlock />
          <ForeignStudentAccess />
        </div>
        <Button className="promo-button-style">Подробнее</Button>
      </div>
    </div>
  );
}

export default StudentServicesSection;
