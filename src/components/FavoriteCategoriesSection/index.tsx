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

interface FavoriteCategoriesSectionProps {
  selectedCategoryId: number | null;
  onSelectCategory: (id: number | null) => void;
}

interface MenuItem {
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  id?: number;
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
  scrollBehavior: "smooth",
  WebkitOverflowScrolling: "touch"
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
  padding: "0 12px",
  touchAction: "manipulation",
});

const menuItems: MenuItem[] = [
  { label: "Избранное", Icon: FavoriteSvg, id: 0 },
  { label: "Техника и Электроника", Icon: DevicesSvg, id: 1 },
  { label: "Товары", Icon: ShoppingBar, id: 2 },
  { label: "Рестораны и доставка", Icon: LunchDiningSvg, id: 3 },
  { label: "Обучение", Icon: SchoolSvg, id: 4 },
  { label: "Спорт", Icon: ExerciseSvg, id: 5 },
  { label: "Рестораны и доставка", Icon: LunchDiningSvg, id: 6 },
  { label: "Обучение", Icon: SchoolSvg, id: 7 },
  { label: "Спорт", Icon: ExerciseSvg, id: 8 },
];

export default function FavoriteCategoriesSection({
  selectedCategoryId,
  onSelectCategory
}: FavoriteCategoriesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isTouchDevice = useRef(false);

  const handleWheelScroll = (event: ReactWheelEvent) => {
    if (scrollRef.current) {
      event.preventDefault();
      scrollRef.current.scrollLeft += event.deltaY;
    }
  };
  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const scrollContainer = scrollRef.current;
    const handleTouchStart = () => {
      isTouchDevice.current = true;
    };
    if (scrollContainer) {
      scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
      return () => {
        scrollContainer.removeEventListener('touchstart', handleTouchStart);
      };
    }
  }, []);

  return (
    <div className="beauty-health-container">
      <ScrollContainer ref={scrollRef} onWheel={handleWheelScroll}>
        {menuItems.map(({ label, Icon, id }) => (
          <StyledButton 
            key={id}
            onClick={() => onSelectCategory(id === selectedCategoryId ? null : id || null)}
            style={{ 
              background: id === selectedCategoryId ? '#e0f7fa' : '#f8f8f8',
              borderColor: id === selectedCategoryId ? '#4dd0e1' : 'rgba(0, 0, 0, 0.2)'
            }}
          >
            <Icon className="icon" />
            {label}
          </StyledButton>
        ))}
      </ScrollContainer>
    </div>
  );
}

