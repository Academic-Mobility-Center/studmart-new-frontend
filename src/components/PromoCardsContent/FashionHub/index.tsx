import StylishWrapper from "@/components/stylish-wrapper";
import "../../PromoCardsContent/style.css"
import PromoCardsDescriprion from "@/components/promo-card-description";
function FashionHub() {
  return (
    <div className="delivery-service-card">
      <StylishWrapper category="cosmetics"/>
      <PromoCardsDescriprion 
        heading="Рив Гош" 
        discount="5" 
        description="Магазин косметики"
      />
    </div>
  );
}

export default FashionHub;
