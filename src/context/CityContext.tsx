"use client"
import { createContext, useContext, useState, useEffect } from "react";

type CityContextType = {
  city: string;
  regionId: string;
  setCity: (city: string, regionId: string) => void;
};

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider = ({ children }: { children: React.ReactNode }) => {
  const [city, setCityState] = useState("");
  const [regionId, setRegionIdState] = useState("");
  // Загружаем город из localStorage при старте
  useEffect(() => {
    const storedCity = localStorage.getItem("selectedCity");
    const storedRegionId = localStorage.getItem("selectedRegionId");

    if (storedCity) {
      setCityState(storedCity);
    }
    if (storedRegionId) {
      setRegionIdState(storedRegionId);
    }
  }, []);

  const setCity = (newCity: string, newRegionId?: string) => {
    setCityState(newCity);
    localStorage.setItem("selectedCity", newCity);
    
    if (newRegionId !== undefined) {
      setRegionIdState(newRegionId);
      localStorage.setItem("selectedRegionId", newRegionId);
    }
  };

  return (
    <CityContext.Provider value={{ city, regionId, setCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) throw new Error("useCity must be used within a CityProvider");
  return context;
};

// "use client";
// import { createContext, useContext, useState, useEffect } from "react";

// type CityContextType = {
//   city: string;
//   regionId: string;
//   setCity: (city: string, regionId?: string) => void;
//   isLoaded: boolean;
// };

// const CityContext = createContext<CityContextType | undefined>(undefined);

// export const CityProvider = ({ children }: { children: React.ReactNode }) => {
//   const [city, setCityState] = useState("");
//   const [regionId, setRegionIdState] = useState("");
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const storedCity = localStorage.getItem("selectedCity");
//     const storedRegionId = localStorage.getItem("selectedRegionId");

//     if (storedCity) {
//       setCityState(storedCity);
//     }
//     if (storedRegionId) {
//       setRegionIdState(storedRegionId);
//     }
//     setIsLoaded(true); // отмечаем, что загрузка из localStorage завершена
//   }, []);

//   const setCity = (newCity: string, newRegionId?: string) => {
//     setCityState(newCity);
//     localStorage.setItem("selectedCity", newCity);

//     if (newRegionId !== undefined) {
//       setRegionIdState(newRegionId);
//       localStorage.setItem("selectedRegionId", newRegionId);
//     }
//   };

//   return (
//     <CityContext.Provider value={{ city, regionId, setCity, isLoaded }}>
//       {children}
//     </CityContext.Provider>
//   );
// };

// export const useCity = () => {
//   const context = useContext(CityContext);
//   if (!context) throw new Error("useCity must be used within a CityProvider");
//   return context;
// };
