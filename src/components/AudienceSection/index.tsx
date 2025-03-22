import "./style.css";
import AudienceSvg from "../../../public/icons/PartnerServicesSection/AudienceSvg";
function AudienceSection() {
  return (
    <div className="targeted-audience-container">
      <AudienceSvg className="discount-image"/>
      {/* <img src="/assets/image_a8d190d9.png" alt="" className="discount-image" /> */}
      <p className="foreign-student-access-heading">Точно определенная аудитория</p>
    </div>
  );
}

export default AudienceSection;
