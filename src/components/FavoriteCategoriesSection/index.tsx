"use client";
import "./style.css";
import FavoriteSvg from "../../../public/icons/favourite-categories/FavoriteSvg";
import { useRef, WheelEvent as ReactWheelEvent, useEffect, useState } from "react";
import { getPromocodeCategories } from "@/lib/api/promocodes";
import { iconMapper, menuItems, ScrollContainer, StyledButton } from "@/app/home/context";
import MenuItem from "@/types/MenuItem";
import { ClipLoader } from 'react-spinners';
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
  const [fetchedMenuItems, setFetchedMenuItems] = useState<MenuItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const handleWheelScroll = (event: ReactWheelEvent<HTMLDivElement>) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;

    const atStart = scrollLeft === 0;
    const atEnd = scrollLeft + clientWidth >= scrollWidth;

    const scrollingLeft = event.deltaY < 0;
    const scrollingRight = event.deltaY > 0;

    const prevent =
      (scrollingLeft && !atStart) || (scrollingRight && !atEnd);

    if (prevent) {
      event.preventDefault();
      scrollContainer.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getPromocodeCategories();
        if (categories) {
          const menuItemsWithIcons = categories
            .sort((a: Category,b: Category ) => {
              if (a.name === "Избранное") return -1;
              if (a.name !== "Избранное") return 1;
              return 0;
            })
          .map((category: Category) => {
            const Icon = iconMapper[category.name] || FavoriteSvg;
            return { ...category, Icon };
          });
          setFetchedMenuItems(menuItemsWithIcons);
        } 
      } catch(error){
        console.log(error)
        setFetchedMenuItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

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
        scrollContainer.scrollLeft += event.deltaY;
      }
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="beauty-health-container">
      {!loading && (
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
      )}
    </div>
  );
}

