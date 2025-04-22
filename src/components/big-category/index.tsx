import React from "react";
import { Button } from "@mui/base";
import "./style.css";

interface Props{
    heading: string;
    description: string;
    discount: string;
    id: number;
}
function BigCategory({ heading , description, discount }: Props) {
  return (
    <div className="promo-card1">
      <div className="delivery-service-section">
        <p className="golden-apple-heading">{heading}</p>
        <p className="golden-apple-cosmetics-description">{description}</p>
      </div>
      <Button className="discount-button1">-{discount}%</Button>
    </div>
    // </Link>
  );
}

export default BigCategory;
