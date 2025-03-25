import React from "react";
import "./style.css"
interface ReferralSectionProps{
    title: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const ServiceCard: React.FC<ReferralSectionProps> = ({ title, Icon }) => {
    return (
      <div className="referral-section-container">
        <Icon className="referral-icon" />
        <p className="referral-title">{title}</p>
      </div>
    );
  };
  
  export default ServiceCard;