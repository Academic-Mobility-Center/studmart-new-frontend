"use client";
import "./style.css";
import FavoriteSvg from "../../../public/icons/favourite-categories/FavoriteSvg";
import { useRef, WheelEvent as ReactWheelEvent, useEffect, useState } from "react";
import { getPromocodeCategories } from "@/lib/api/promocodes";
import { iconMapper, menuItems, ScrollContainer, StyledButton } from "@/app/home/context";

interface FavoriteCategoriesSectionProps {
  selectedCategoryId: number | null;
  onSelectCategory: (id: number | null) => void;
}

interface Category {
  id: number;
  name: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function FavoriteCategoriesSection({
  selectedCategoryId,
  onSelectCategory
}: FavoriteCategoriesSectionProps) {
  const [fetchedMenuItems, setFetchedMenuItems] = useState(menuItems);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isTouchDevice = useRef(false);

  const handleWheelScroll = (event: ReactWheelEvent) => {
    if (scrollRef.current) {
      event.preventDefault();
      scrollRef.current.scrollLeft += event.deltaY;
    }
  };
  
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getPromocodeCategories();

      if (categories) {
        const menuItemsWithIcons = categories.map((category: Category) => {
          const Icon = iconMapper[category.name] || FavoriteSvg;
          return { ...category, Icon };
        });

        setFetchedMenuItems(menuItemsWithIcons);
      } else {
        setFetchedMenuItems([]);
      }
    };

  
    fetchCategories();  
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isTouchDevice.current) return;
  
    const handleWheel = (event: WheelEvent) => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
  
      const atStart = scrollLeft === 0;
      const atEnd = scrollLeft + clientWidth >= scrollWidth;
  
      const scrollingLeft = event.deltaY < 0;
      const scrollingRight = event.deltaY > 0;
  
      const prevent =
        (scrollingLeft && !atStart) || (scrollingRight && !atEnd);
  
      if (prevent) {
        event.preventDefault();
        scrollContainer.scrollLeft += event.deltaY * 1.5;
      }
    };
  
    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
  
    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);
  

  return (
    <div className="beauty-health-container">
      <ScrollContainer ref={scrollRef} onWheel={handleWheelScroll}>
        {fetchedMenuItems.map(({ name, Icon, id }) => (
          <StyledButton 
            key={id}
            onClick={() => onSelectCategory(id === selectedCategoryId ? null : id || null)}
            style={{ 
              background: id === selectedCategoryId ? '#e0f7fa' : '#f8f8f8',
              borderColor: id === selectedCategoryId ? '#4dd0e1' : 'rgba(0, 0, 0, 0.2)'
            }}
          >
            <Icon className="icon" />
            {name}
          </StyledButton>
        ))}
      </ScrollContainer>
    </div>
  );
}

