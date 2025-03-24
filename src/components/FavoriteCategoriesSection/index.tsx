"use client";
import "./style.css";
import { Button, Box } from "@mui/material";
import styled from "@emotion/styled";
import FavoriteSvg from "../../../public/icons/favourite-categories/FavoriteSvg";
import DevicesSvg from "../../../public/icons/favourite-categories/DevicesSvg";
import ShoppingBar from "../../../public/icons/favourite-categories/ShoppingBarSvg";
import LunchDiningSvg from "../../../public/icons/favourite-categories/LunchDiningSvg";
import SchoolSvg from "../../../public/icons/favourite-categories/SchoolSvg";
import ExerciseSvg from "../../../public/icons/favourite-categories/ExerciseSvg";
import HealthAndBeautySvg from "../../../public/icons/favourite-categories/HealthAndBeautySvg";
import { useRef, WheelEvent as ReactWheelEvent, useEffect } from "react";

interface MenuItem {
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const ScrollContainer = styled(Box)({
  display: "flex",
  overflowX: "auto",
  gap: "10px",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  maxWidth: "1200px",
  whiteSpace: "nowrap",
});

const StyledButton = styled(Button)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  height: "54px",
  fontSize: "14px",
  textTransform: "none",
  background: "#f8f8f8",
  color: "#032c28",
  border: "1px solid rgba(0, 0, 0, 0.2)",
  borderRadius: "15px",
  whiteSpace: "nowrap",
  flexShrink: 0, 
  padding: "0 12px"
});

const menuItems: MenuItem[] = [
  { label: "Избранное", Icon: FavoriteSvg },
  { label: "Техника и Электроника", Icon: DevicesSvg },
  { label: "Товары", Icon: ShoppingBar },
  { label: "Рестораны и доставка", Icon: LunchDiningSvg },
  { label: "Обучение", Icon: SchoolSvg },
  { label: "Спорт", Icon: ExerciseSvg },
  { label: "Красота и здоровье", Icon: HealthAndBeautySvg},
  { label: "Обучение", Icon: SchoolSvg },
  { label: "Спорт", Icon: ExerciseSvg },
  { label: "Красота и здоровье", Icon: HealthAndBeautySvg},
  { label: "Спорт", Icon: ExerciseSvg },
  { label: "Красота и здоровье", Icon: HealthAndBeautySvg},
  { label: "Красота и здоровье", Icon: HealthAndBeautySvg},
  { label: "Спорт", Icon: ExerciseSvg },
  { label: "Красота и здоровье", Icon: HealthAndBeautySvg}
];

export default function FavoriteCategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleWheelScroll = (event: ReactWheelEvent) => {
    if (scrollRef.current) {
      event.preventDefault();
      scrollRef.current.scrollLeft += event.deltaY;
    }
  };
  useEffect(() => {
    const disableScroll = (event: Event) => event.preventDefault();

    const handleMouseEnter = () => {
      document.addEventListener("wheel", disableScroll, { passive: false });
    };

    const handleMouseLeave = () => {
      document.removeEventListener("wheel", disableScroll);
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("mouseenter", handleMouseEnter);
      scrollContainer.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("wheel", disableScroll);
      if (scrollContainer) {
        scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
        scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="beauty-health-container">
      <div className="beauty-health-banner" />
        <ScrollContainer ref={scrollRef} onWheel={handleWheelScroll}>
        {menuItems.map(({ label, Icon }, index) => (
          <StyledButton key={index}>
            <Icon className="icon" />
            {label}
          </StyledButton>
        ))}
      </ScrollContainer>
    </div>
  );
}

