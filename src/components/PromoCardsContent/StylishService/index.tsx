import "./style.css";
import StylishWrapper from "@/components/stylish-wrapper";
import PromoCardsDescriprion from "@/components/promo-card-description";
// import "../../PromoCardsContent/style.css"

function StylishService() {
  return (
    <div className="delivery-service-card">
      <StylishWrapper category="delivery"/>
      <PromoCardsDescriprion 
        heading="Самокат" 
        discount="10" 
        description="Сервис доставки"
      />
    </div>
  );
}

export default StylishService;
