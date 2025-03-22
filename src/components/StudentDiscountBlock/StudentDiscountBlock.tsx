import { Button } from "@mui/base";
import "./style.css";

function StudentDiscountBlock() {
  return (
    <div className="student-discount-offer-container">
      <div className="student-discount-offer-container1">
        <p className="exclusive-discount-message">
          Получай эксклюзивные скидки у партнеров,
          <br />
          ведь ты студент!
        </p>
        <Button className="exclusive-discount-button">Получить доступ</Button>
      </div>
    </div>
  );
}

export default StudentDiscountBlock;
