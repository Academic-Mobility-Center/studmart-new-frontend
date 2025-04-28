"use client";
import "./style.css";
import FavoriteSvg from "../../../public/icons/favourite-categories/FavoriteSvg";
import { useEffect, useState } from "react";
import { getPromocodeCategories } from "@/lib/api/promocodes";
import { iconMapper, ScrollContainer, StyledButton } from "@/app/home/context";
import MenuItem from "@/types/MenuItem";
import { useHorizontalScroll } from "@/utils/horizontalScroll";
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
  const scrollRef = useHorizontalScroll();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getPromocodeCategories();
        if (categories) {
          const menuItemsWithIcons = categories
            .sort((a: Category ) => {
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
  }, []);

  return (
    <div className="beauty-health-container">
      {!loading && (
              <ScrollContainer ref={scrollRef}>
              {fetchedMenuItems.map(({ name, Icon, id }) => (
                  <StyledButton 
                    key={id}
                    onClick={() => onSelectCategory(id === selectedCategoryId ? null : id || null)}
                    style={{ 
                      background: id === selectedCategoryId ? '#e0f7fa' : '#f8f8f8',
                      borderColor: id === selectedCategoryId ? '#4dd0e1' : 'rgba(0, 0, 0, 0.2)',
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

