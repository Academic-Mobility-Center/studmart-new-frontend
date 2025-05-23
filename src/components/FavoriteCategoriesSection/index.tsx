"use client";
import "./style.css";
import { useEffect, useRef, useState } from "react";
import { getPromocodeCategories } from "@/lib/api/promocodes";
import { ScrollContainer, StyledButton } from "@/app/home/context";
import MenuItem from "@/types/MenuItem";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
interface FavoriteCategoriesSectionProps {
  selectedCategoryId: number | null;
  onSelectCategory: (id: number | null) => void;
}

interface Category {
  id: number;
  name: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  IconUrl?: string;
}

export default function FavoriteCategoriesSection({
  selectedCategoryId,
  onSelectCategory,
}: FavoriteCategoriesSectionProps) {
  const [fetchedMenuItems, setFetchedMenuItems] = useState<MenuItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, role } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getPromocodeCategories();
        if (categories) {
          const withIcons = categories.map((category: Category) => ({
            ...category,
            IconUrl: category.IconUrl || `https://files.studmart-dev.inxan.ru/Categories/${category.id}`,
          }));

          const favorite = {
            id: 0,
            name: "Избранное",
            IconUrl: "/icons/home/star.svg"
          };
          const others = withIcons.filter((c: Category) => c.name !== "Избранное");

          const finalMenu = isAuthenticated && favorite && role && role === "student"
            ? [favorite, ...others]
            : others;

          setFetchedMenuItems(finalMenu);
        }
      } catch (error) {
        console.error(error);
        setFetchedMenuItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  },[isAuthenticated, role]);

  useEffect(() => {
    if (loading) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleWheelScroll = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        scrollContainer.scrollLeft += event.deltaY;
        event.preventDefault();
      }
    };

    scrollContainer.addEventListener("wheel", handleWheelScroll, { passive: false });

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheelScroll);
    };
  }, [loading]);

  const IconComponent = ({ iconUrl }: { iconUrl?: string }) =>
    iconUrl ? (
      <Image
        src={iconUrl}
        width={24}
        height={24}
        alt=""
        unoptimized
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://files.studmart-dev.inxan.ru/Categories/9";
        }}
      />
    ) : (
      <div style={{width: 24, height: 24}} />
    );

  return (
    <div className="beauty-health-container">
      {!loading && (
        <ScrollContainer ref={scrollRef}>
          {fetchedMenuItems.map(({ name, IconUrl, id }) => (
            <StyledButton
              key={id}
              onClick={() => onSelectCategory(typeof id === "number" ? (id === selectedCategoryId ? null : id) : null)}
              style={{
                background: id === selectedCategoryId ? "#e0f7fa" : "#f8f8f8",
                borderColor: id === selectedCategoryId ? "#4dd0e1" : "rgba(0, 0, 0, 0.2)",
              }}
            >
              <IconComponent iconUrl={IconUrl} />
              {name}
            </StyledButton>
          ))}
        </ScrollContainer>
      )}
    </div>
  );
}
