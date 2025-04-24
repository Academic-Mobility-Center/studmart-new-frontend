import DevicesSvg from "../../../public/icons/favourite-categories/DevicesSvg";
import LunchDiningSvg from "../../../public/icons/favourite-categories/LunchDiningSvg";
import ExerciseSvg from "../../../public/icons/favourite-categories/ExerciseSvg";
import FavoriteSvg from "../../../public/icons/favourite-categories/FavoriteSvg";
import SchoolSvg from "../../../public/icons/favourite-categories/SchoolSvg";
import ShoppingBarSvg from "../../../public/icons/favourite-categories/ShoppingBarSvg"
import ShoppingBar from "../../../public/icons/favourite-categories/ShoppingBarSvg"
import MenuItem from "@/types/MenuItem";
import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import promoCard from "@/types/PromoCard";

export const iconMapper: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    "Рестораны и доставка": LunchDiningSvg,
    "Техника и Электроника": DevicesSvg,
    "Товары": ShoppingBarSvg,
    "Обучение": SchoolSvg,
    "Спорт": ExerciseSvg,
    "Избранное": FavoriteSvg,
};

export const ScrollContainer = styled(Box)({
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

export const StyledButton = styled(Button)({
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

export const menuItems: MenuItem[] = [
{ name: "Избранное", Icon: FavoriteSvg, id: 0 },
{ name: "Техника и Электроника", Icon: DevicesSvg, id: 1 },
{ name: "Товары", Icon: ShoppingBar, id: 2 },
{ name: "Рестораны и доставка", Icon: LunchDiningSvg, id: 3 },
{ name: "Обучение", Icon: SchoolSvg, id: 4 },
{ name: "Спорт", Icon: ExerciseSvg, id: 5 },
{ name: "Рестораны и доставка", Icon: LunchDiningSvg, id: 6 },
{ name: "Обучение", Icon: SchoolSvg, id: 7 },
{ name: "Спорт", Icon: ExerciseSvg, id: 8 },
];
type PromoPartners ={
    id: string;
    companyName: string;
    description: string;
    maxDiscount: string;
    category: {
        id: number;
        name: string;
    };
    hasAllRegions: boolean;
    regions: { id: number; name: string }[];
}
export const transformPromos = (data: PromoPartners[]): promoCard[] => {
  return data.map((item, index) => ({
    id: index,
    heading: item.companyName,
    discount: item.maxDiscount,
    description: item.description,
    imageUrl: "/icons/home/delivery.svg", 
    categoryId: item.category.id,
  }));
};
interface DiscountRegion {
    id: number;
    name: string;
  }
  
  interface DiscountCategory {
    id: number;
    name: string;
  }
  
  interface DiscountPartner {
    id: string;
    companyName: string;
    subtitle: string;
    description: string;
    site: string;
    category: DiscountCategory;
    hasAllRegions: boolean;
    regions: DiscountRegion[];
  }
  
  interface Discount {
    id: string;
    name: string;
    description: string;
    size: number;
    promocodeValue: string;
    partner: DiscountPartner;
    hasAllRegions: boolean;
    regions: DiscountRegion[];
  }
export const fallbackPromoCodes: Discount[] = [
    {
      id: "1",
      name: "-15% на покупку от 700 руб.",
      description: "Не упустите возможность порадовать себя вкусным кофе и десертами по специальной цене!",
      size: 15,
      promocodeValue: "COFFEE15",
      partner: {
        id: "1",
        companyName: "Кофейня №1",
        subtitle: "Лучшее место для кофе",
        description: "Описание",
        site: "https://coffee.example.com",
        category: {
          id: 1,
          name: "Кафе"
        },
        hasAllRegions: true,
        regions: [{ id: 1, name: "Москва" }]
      },
      hasAllRegions: true,
      regions: [{ id: 1, name: "Москва" }]
    },
    {
      id: "2",
      name: "-15% на покупку от 500 руб.",
      description: "Не упустите возможность порадовать себя вкусным кофе и десертами по специальной цене!",
      size: 15,
      promocodeValue: "SWEET15",
      partner: {
        id: "1",
        companyName: "Кофейня №1",
        subtitle: "Лучшее место для кофе",
        description: "Описание",
        site: "https://coffee.example.com",
        category: {
          id: 1,
          name: "Кафе"
        },
        hasAllRegions: true,
        regions: [{ id: 1, name: "Москва" }]
      },
      hasAllRegions: true,
      regions: [{ id: 1, name: "Москва" }]
    },
    {
      id: "3",
      name: "-15% на покупку от 200 руб.",
      description: "Не упустите возможность порадовать себя вкусным кофе и десертами по специальной цене!",
      size: 15,
      promocodeValue: "WELCOME15",
      partner: {
        id: "1",
        companyName: "Кофейня №1",
        subtitle: "Лучшее место для кофе",
        description: "Описание",
        site: "https://coffee.example.com",
        category: {
          id: 1,
          name: "Кафе"
        },
        hasAllRegions: true,
        regions: [{ id: 1, name: "Москва" }]
      },
      hasAllRegions: true,
      regions: [{ id: 1, name: "Москва" }]
    }
  ];