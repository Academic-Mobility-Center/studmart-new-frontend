

import StylishService from "../PromoCardsContent/StylishService";
import FashionHub from "../PromoCardsContent/FashionHub";
import SweetTreatsPage from "../PromoCardsContent/SweetTreatsPage";
import CreativeHub from "../PromoCardsContent/CreativeHub";
import "./style.css";
import StylishAppleMarket from "../PromoCardsContent/StylishAppleMarket";

const category = ["academic", "treats", "cosmetics", "delivery", "golden-apple"]; 
function StylishWidgetCollection({ rows, renderPromoCardsRow }: { rows: number, renderPromoCardsRow: () => React.JSX.Element }) {
  // Генерируем массив рядов карточек
  const promoCardRows = [];
  for (let i = 0; i < rows; i++) {
    promoCardRows.push(
      <div key={i}>{renderPromoCardsRow()}</div> // Adding a unique key for each row
    );
  }

  return (
    <div className="hierarchical-text-container">
      <div className="hierarchical-content-container">
        {promoCardRows}
      </div>
    </div>
  );
}

export default StylishWidgetCollection;
