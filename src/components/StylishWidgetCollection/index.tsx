import "./style.css";

const category = ["academic", "treats", "cosmetics", "delivery", "golden-apple"]; 
function StylishWidgetCollection({ rows, renderPromoCardsRow }: { rows: number, renderPromoCardsRow: () => React.JSX.Element }) {
  const promoCardRows = [];
  for (let i = 0; i < rows; i++) {
    promoCardRows.push(
      <div key={i}>{renderPromoCardsRow()}</div>
    );
  }

  return (
    <>
      <div className="hierarchical-text-container">
        <div className="hierarchical-content-container">
          {promoCardRows}
        </div>
      </div>
    </>

  );
}

export default StylishWidgetCollection;
