import ProfitabilitySection from "../ProfitabilitySection";
import AudienceSection from "../AudienceSection";
import "./style.css";

function BusinessOverviewSection() {
  return (
    <div className="vertical-flex-container">
      <ProfitabilitySection />
      <AudienceSection />
    </div>
  );
}

export default BusinessOverviewSection;
