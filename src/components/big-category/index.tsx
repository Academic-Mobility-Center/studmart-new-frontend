import React from "react";
import { Button } from "@mui/base";
import "./style.css";
import Link from "next/link";

interface Props{
    heading: string;
    description: string;
    discount: string;
    id: number;
}
function BigCategory({ heading , description, discount, id }: Props) {
  return (
  //   <Link 
  //   href={`/offer-page/${id}`}
  //   className="big-category-link" // Добавляем класс для стилей
  // >
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
