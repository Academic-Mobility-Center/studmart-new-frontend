import DevicesSvg from "../../../public/icons/favourite-categories/DevicesSvg";
import LunchDiningSvg from "../../../public/icons/favourite-categories/LunchDiningSvg";
import ExerciseSvg from "../../../public/icons/favourite-categories/ExerciseSvg";
import FavoriteSvg from "../../../public/icons/favourite-categories/FavoriteSvg";
import SchoolSvg from "../../../public/icons/favourite-categories/SchoolSvg";
import ShoppingBarSvg from "../../../public/icons/favourite-categories/ShoppingBarSvg"
import ShoppingBar from "../../../public/icons/favourite-categories/ShoppingBarSvg"
import MenuItem from "@/types/MenuItem";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import promoCard from "@/types/PromoCard";
import { forwardRef } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import RegistrationFormData from "@/types/RegistrationFormData";

export const iconMapper: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    "Рестораны и доставка": LunchDiningSvg,
    "Техника и электроника": DevicesSvg,
    "Товары": ShoppingBarSvg,
    "Обучение": SchoolSvg,
    "Спорт": ExerciseSvg,
    "Избранное": FavoriteSvg,
    "Отдых":ExerciseSvg,
    "Развлечения": ExerciseSvg
};
const ScrollContainerBase = forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <Box ref={ref} component="div" {...props} />
));

ScrollContainerBase.displayName = 'ScrollContainerBase';

// Стилизация
export const ScrollContainer = styled(ScrollContainerBase)({
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
    subtitle: string;
    maxDiscount: string;
    category: {
        id: number;
        name: string;
    };
    hasAllRegions: boolean;
    regions: { id: number; name: string }[];
    isFixed: boolean;
}
export const transformPromos = (data: PromoPartners[]): promoCard[] => {
  return data.map((item) => ({
    id: item.id,
    heading: item.companyName,
    discount: item.maxDiscount,
    subtitle: item.subtitle,
    imageUrl: "/icons/home/delivery.svg", 
    categoryId: item?.category?.id || 0,
    isFixed: item.isFixed || false
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

interface ValidateProps1{
  formData: RegistrationFormData;
  setErrors: (value: React.SetStateAction<{
    password?: string;
    confirmPassword?: string;
    email?: string;
  }>) => void
}

export const validateForm1: React.FC<ValidateProps1> = ({formData, setErrors}) => {
  const newErrors: { email?: string, password?: string, confirmPassword?: string } = {};

  const emailRegex = /^\s*[\w\-\+_']+(\.[\w\-\+_']+)*\@[A-Za-z0-9]([\w\.-]*[A-Za-z0-9])?\.[A-Za-z][A-Za-z\.]*[A-Za-z]$/;
  const minEmailLength = 5;
  const maxEmailLength = 70;

  if (!formData.email?.trim()) {
      newErrors.email = "Введите email";
  } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Некорректный email";
  } else if (
      formData.email.trim().length < minEmailLength ||
      formData.email.trim().length > maxEmailLength
  ) {
      newErrors.email = `Email должен содержать от ${minEmailLength} до ${maxEmailLength} символов`;
  }

  if (!formData.password) {
      newErrors.password = "Введите пароль";
  } else if (formData.password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
  }

  if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Подтвердите пароль";
  } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};



export default function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
          const result = reader.result as string;
          // result будет в формате: data:<content-type>;base64,<base64string>
          // Если нужен только base64, можно отрезать префикс:
          const base64String = result.split(',')[1];
          resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
  });
}