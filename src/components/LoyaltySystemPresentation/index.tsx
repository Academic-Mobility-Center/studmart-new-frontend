import { Button } from "@mui/base";
import LoyaltyProgramDescription from "../LoyaltyProgramDescription";
import BusinessPromotionSnippet from "../BusinessPromotionSnippet";
import "./style.css";

function LoyaltySystemPresentation() {
  return (
    <div className="loyalty-program-container">
      <p className="loyalty-program-description-text-style">«Студмарт» — это система лояльности. Студентам она предоставляет скидки, а бизнесу — возможность расширить аудиторию.</p>
      <div className="loyalty-program-details-container">
        <LoyaltyProgramDescription />
        <BusinessPromotionSnippet />
      </div>
      <Button className="primary-button-style">Зарегистрироваться</Button>
    </div>
  );
}

export default LoyaltySystemPresentation;
