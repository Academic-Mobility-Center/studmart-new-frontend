import { Button } from "@mui/base";
import ImageDisplayWidget from "../ImageDisplayWidget";
import SalesChannelCard from "../SalesChannelCard";
import "./style.css";
import ProfitabilitySvg from "../../../public/icons/PartnerServicesSection/ProfitabilitySvg";
import AudienceSvg from "../../../public/icons/PartnerServicesSection/AudienceSvg";
import ServiceCard from "../service-card";
import Link from "next/link";

function PartnerSection() {
  return (
    <div className="partner-benefits-container">
      <div className="partner-section1">
        <div className="partner-section">
          <p className="partner-heading">Партнерам</p>
            <div className="vertical-flex-container">
              <ServiceCard title="Окупаемая стоимость" Icon={ProfitabilitySvg}/>
              <ServiceCard title="Точно определяемая аудитория" Icon={AudienceSvg}/>    
            </div>
        </div>
        <div className="marketing-panel">
          <ImageDisplayWidget />
          <SalesChannelCard />
        </div>
      </div>
      <Link href="partners">
        <Button className="partner-details-button">Подробнее</Button>
      </Link>
    </div>

  );
}

export default PartnerSection;
