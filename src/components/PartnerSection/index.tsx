import { Button } from "@mui/base";
import BusinessOverviewSection from "../BusinessOverviewSection";
import ImageDisplayWidget from "../ImageDisplayWidget";
import SalesChannelCard from "../SalesChannelCard";
import "./style.css";

function PartnerSection() {
  return (
    <div className="partner-benefits-container">
      <div className="partner-section1">
        <div className="partner-section">
          <p className="partner-heading">Партнерам</p>
          <BusinessOverviewSection />
        </div>
        <div className="marketing-panel">
          <ImageDisplayWidget />
          <SalesChannelCard />
        </div>
      </div>
      <Button className="partner-details-button">Подробнее</Button>
    </div>
  );
}

export default PartnerSection;
