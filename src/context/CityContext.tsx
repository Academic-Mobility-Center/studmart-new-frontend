"use client"
import { createContext, useContext, useState, useEffect } from "react";

type CityContextType = {
  city: string;
  setCity: (city: string) => void;
};

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider = ({ children }: { children: React.ReactNode }) => {
  const [city, setCityState] = useState("");

  // Загружаем город из localStorage при старте
  useEffect(() => {
    const storedCity = localStorage.getItem("selectedCity");
    if (storedCity) {
      setCityState(storedCity);
    }
  }, []);

  // Оборачиваем setCity и сохраняем в localStorage
  const setCity = (newCity: string) => {
    setCityState(newCity);
    localStorage.setItem("selectedCity", newCity);
  };

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) throw new Error("useCity must be used within a CityProvider");
  return context;
};
