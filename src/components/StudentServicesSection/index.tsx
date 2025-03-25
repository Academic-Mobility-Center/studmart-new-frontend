import { Button } from "@mui/base";
import "./style.css";
import ServiceCard from "../service-card";
import ReferalSvg from "../../../public/icons/StudentServicesSection/ReferalSvg";
import ProcentSvg from "../../../public/icons/StudentServicesSection/ProcentSvg";
import MoneySvg from "../../../public/icons/StudentServicesSection/MoneySvg";
import ForeignStudentSvg from "../../../public/icons/PartnerServicesSection/ForeignStudentSvg";
function StudentServicesSection() {
  return (
    <div >
      <div className="student-benefit-card">
        <p className="student-title-heading">Студентам</p>
        <div className="student-offers-container">
          <ServiceCard title={"Получаешь скидку 5–30%"} Icon={ProcentSvg}/>
          <ServiceCard title={"Реферальная система"} Icon={ReferalSvg}/>
        </div>
        <div className="student-benefits-section">
          <ServiceCard title={"Бесплатно"} Icon={MoneySvg}/>
          <ServiceCard title={"Доступ для иностранных студентов"} Icon={ForeignStudentSvg}/>
        </div>
        <Button className="promo-button-style">Подробнее</Button>
      </div>
    </div>
  );
}

export default StudentServicesSection;
