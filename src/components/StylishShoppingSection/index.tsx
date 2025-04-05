import { useState } from "react";
import BrightStar from "../../../public/icons/ContentLayoutWidget/BrightStar";
import Star from "../../../public/icons/ContentLayoutWidget/Star";
import BigCategory from "../big-category";
import FavoriteCategoriesSection from "../FavoriteCategoriesSection";
import StylishWidgetSection from "../StylishWidgetSection";
import "./style.css";


function StylishShoppingSection() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  return (
    <div className="beauty-health-container2">
      <FavoriteCategoriesSection 
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />
      <div className="promo-card-container2">
        <div className="flex-column-centered">
          <div className="flex-column-container bg-svg-1">
            <BrightStar className="svg-container" />
          </div>
          <BigCategory 
            heading="Золотое Яблоко"
            description="Магазин косметики"
            discount="10"
            id={1}
          />
        </div>
        <div className="flex-column-centered">
          <div className="flex-column-container bg-svg-2">
              <Star className="svg-container" />
          </div>
          <BigCategory 
            heading="Шоколадница" 
            description="Сеть кофеен" 
            discount="15"
            id={2}
          />
        </div>
        <div className="flex-column-centered">
          <div className="flex-column-container bg-svg-3">
            <Star className="svg-container" />
          </div>
          <BigCategory
            heading="Рив Гош"
            description="Магазин косметики"
            discount="5"
            id={3}
          />
        </div>
      </div>
      <StylishWidgetSection 
        selectedCategoryId={selectedCategoryId}
      />
    </div>
  );
}

export default StylishShoppingSection;

// import BrightStar from "../../../public/icons/ContentLayoutWidget/BrightStar";
// import Star from "../../../public/icons/ContentLayoutWidget/Star";
// import BigCategory from "../big-category";
// import StylishWidgetSection from "../StylishWidgetSection";
// import { Button, Box } from "@mui/material";
// import styled from "@emotion/styled";
// import FavoriteSvg from "../../../public/icons/favourite-categories/FavoriteSvg";
// import DevicesSvg from "../../../public/icons/favourite-categories/DevicesSvg";
// import ShoppingBar from "../../../public/icons/favourite-categories/ShoppingBarSvg";
// import LunchDiningSvg from "../../../public/icons/favourite-categories/LunchDiningSvg";
// import SchoolSvg from "../../../public/icons/favourite-categories/SchoolSvg";
// import ExerciseSvg from "../../../public/icons/favourite-categories/ExerciseSvg";
// import HealthAndBeautySvg from "../../../public/icons/favourite-categories/HealthAndBeautySvg";
// import { useRef, useEffect, WheelEvent as ReactWheelEvent } from "react";

// const ScrollContainer = styled(Box)({
//   display: "flex",
//   overflowX: "auto",
//   gap: "10px",
//   scrollbarWidth: "none",
//   "&::-webkit-scrollbar": {
//     display: "none",
//   },
//   maxWidth: "1200px",
//   whiteSpace: "nowrap",
// });

// const StyledButton = styled(Button)({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   gap: "10px",
//   height: "54px",
//   fontSize: "14px",
//   textTransform: "none",
//   background: "#f8f8f8",
//   color: "#032c28",
//   border: "1px solid rgba(0, 0, 0, 0.2)",
//   borderRadius: "15px",
//   whiteSpace: "nowrap",
//   flexShrink: 0,
//   padding: "0 12px"
// });

// const menuItems = [
//   { label: "Избранное", Icon: FavoriteSvg, id: 0 },
//   { label: "Техника и Электроника", Icon: DevicesSvg, id: 1 },
//   { label: "Товары", Icon: ShoppingBar, id: 2 },
//   { label: "Рестораны и доставка", Icon: LunchDiningSvg, id: 3 },
//   { label: "Обучение", Icon: SchoolSvg, id: 4 },
//   { label: "Спорт", Icon: ExerciseSvg, id: 5 },
//   { label: "Рестораны и доставка", Icon: LunchDiningSvg, id: 3 },
//   { label: "Обучение", Icon: SchoolSvg, id: 4 },
//   { label: "Спорт", Icon: ExerciseSvg, id: 5 },
// ];

// function FavoriteCategoriesSection() {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const handleWheelScroll = (event: ReactWheelEvent) => {
//     if (scrollRef.current) {
//       event.preventDefault();
//       scrollRef.current.scrollLeft += event.deltaY;
//     }
//   };

//   useEffect(() => {
//     const disableScroll = (event: Event) => event.preventDefault();

//     const handleMouseEnter = () => {
//       document.addEventListener("wheel", disableScroll, { passive: false });
//     };

//     const handleMouseLeave = () => {
//       document.removeEventListener("wheel", disableScroll);
//     };

//     const scrollContainer = scrollRef.current;
//     if (scrollContainer) {
//       scrollContainer.addEventListener("mouseenter", handleMouseEnter);
//       scrollContainer.addEventListener("mouseleave", handleMouseLeave);
//     }

//     return () => {
//       document.removeEventListener("wheel", disableScroll);
//       if (scrollContainer) {
//         scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
//         scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
//       }
//     };
//   }, []);

//   return (
//     <div className="flex flex-col items-center bg-[#F8F8F8]">
//       <div className="w-full h-14 bg-gradient-to-r from-transparent to-white" />
//       <ScrollContainer ref={scrollRef} onWheel={handleWheelScroll} className="flex gap-4 max-w-screen-xl mx-auto">
//         {menuItems.map(({ label, Icon }, index) => (
//           <StyledButton key={index} className="flex items-center justify-center gap-2 h-14 text-sm bg-gray-100 text-green-900 border border-gray-300 rounded-xl px-3">
//             <Icon className="w-8 h-8" />
//             {label}
//           </StyledButton>
//         ))}
//       </ScrollContainer>
//     </div>
//   );
// }

// function StylishShoppingSection() {
//   return (
//     <div className="mt-8">
//       <FavoriteCategoriesSection />
//       <div className="flex gap-6 justify-between mt-8 max-w-screen-xl mx-auto">
//         <div className="flex flex-col items-center">
//           <div className="flex flex-col items-end justify-start bg-cover bg-no-repeat bg-center w-full h-[170px] p-4 rounded-t-2xl relative" style={{ backgroundImage: 'url("/icons/big-categories/GoldenAppleBig.svg")' }}>
//             <BrightStar className="w-8 h-8" />
//           </div>
//           <BigCategory
//             heading="Золотое Яблоко"
//             description="Магазин косметики"
//             discount="10"
//           />
//         </div>
//         <div className="flex flex-col items-center">
//           <div className="flex flex-col items-end justify-start bg-cover bg-no-repeat bg-center w-full h-[170px] p-4 rounded-t-2xl relative" style={{ backgroundImage: 'url("/icons/big-categories/ChocolateBig.svg")' }}>
//             <Star className="w-8 h-8" />
//           </div>
//           <BigCategory
//             heading="Шоколадница"
//             description="Сеть кофеен"
//             discount="15"
//           />
//         </div>
//         <div className="flex flex-col items-center">
//           <div className="flex flex-col items-end justify-start bg-cover bg-no-repeat bg-center w-full h-[170px] p-4 rounded-t-2xl relative" style={{ backgroundImage: 'url("/icons/big-categories/CosmeticsBig.svg")' }}>
//             <Star className="w-8 h-8" />
//           </div>
//           <BigCategory
//             heading="Рив Гош"
//             description="Магазин косметики"
//             discount="5"
//           />
//         </div>
//       </div>
//       <StylishWidgetSection />
//     </div>
//   );
// }

// export default StylishShoppingSection;
