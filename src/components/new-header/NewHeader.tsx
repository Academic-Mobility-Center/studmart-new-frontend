"use client";
import Image from "next/image";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
interface NewHeaderProps {
  isAuthenticated: boolean;
}

export default function NewHeader({ isAuthenticated }: NewHeaderProps) {
  const { role } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const isAuth = (isAuthenticated && role && role === "partner") 
  ? "/partner-personal-account" 
  : isAuthenticated 
  ? "/student-personal-account" 
  : "#";
    return (
    <header className="w-7xl bg-[#8fe248] flex items-center justify-start h-20 pl-[40px] rounded-b-[30px]">
      <div className="w-[320px]">
        <Link href="/home">
          <Image src="/icons/Header/logo.svg" alt="" width={141} height={30} />
        </Link>
      </div>

      <nav className="w-[430px] flex items-center gap-10">
        <NavItem text="Предложения" url={"/home"} isAuthenticated={isAuthenticated} />
        <NavItem text="О сервисе" url={"/about"} isAuthenticated={isAuthenticated} />
        <NavItem text="Партнерам" url={"/partners"} isAuthenticated={isAuthenticated} />
      </nav>

      <div className="w-[481px] flex items-center gap-[24px]">
        <div 
          className={`flex items-center gap-2 ${isAuthenticated ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`} 
          onClick={isAuthenticated ? openModal : undefined}
        >
          <Image src="/icons/Header/location.svg" alt="" width={24} height={24} />
          <p className="text-sm text-[#032c28] max-w-[110px]">
            {selectedCity || "Выберите город"}
          </p>
        </div>
        <SearchBar isAuthenticated={isAuthenticated} />
        <div className="flex items-center gap-2 pl-4">
          <Link href={isAuth}>
            <Image 
              src="/icons/Header/account.svg" 
              alt="" 
              width={24} 
              height={24} 
              className={!isAuthenticated ? "opacity-50" : ""}
            />          
          </Link>
          <Image 
            src="/icons/Header/wallet.svg" 
            alt="" 
            width={24} 
            height={24} 
            className={!isAuthenticated ? "opacity-50" : ""}
          />
        </div>
      </div>
      {isAuthenticated && (
        <CitySelectionModal isOpen={isModalOpen} closeModal={closeModal} setSelectedCity={setSelectedCity} />
      )}
    </header>
  );
}

interface NavItemProps {
  text: string;
  url: string;
  isAuthenticated: boolean;
}

function NavItem({ text, url, isAuthenticated }: NavItemProps) {
  return (
    <div className="w-auto h-[18px] flex items-center">
      <Link 
        href={isAuthenticated ? url : "#"} 
        className={`text-sm font-bold text-[#032c28] m-0 p-0 ${!isAuthenticated ? "pointer-events-none opacity-50" : ""}`}
      >
        {text}
      </Link>
    </div>
  );
}

interface SearchBarProps {
  isAuthenticated: boolean;
}

function SearchBar({ isAuthenticated }: SearchBarProps) {
  return (
    <div className={`w-[201px] flex flex-col gap-1 ${!isAuthenticated ? "opacity-50" : ""}`}>
      <p className="text-sm text-[#032c28]">Поиск</p>
      <div className="border-t border-[#032c28]"></div>
    </div>
  );
}
function CitySelectionModal({ isOpen, closeModal, setSelectedCity }: { isOpen: boolean; closeModal: () => void; setSelectedCity: (city: string) => void }) {
  const [cities, setCities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  useEffect(() => {
    fetch("http://to-your-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token Some-Token-bla-bla-bla"
      },
      body: JSON.stringify({
        // какие нибудь параметры
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCities(data.suggestions.map((s: any) => s.value));
      });
  }, []);
  
  return (
    <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
      <div className="bg-white p-6 rounded-lg w-[700px] h-[700px] flex flex-col items-center">
        <h2 className="text-lg font-bold text-black">Выберите город</h2>
        <input
          type="text"
          placeholder="Введите название региона"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 w-full rounded mt-2 text-black"
        />
        <ul className="w-full overflow-auto mt-4">
          {filteredCities.length > 0 ? (
            filteredCities.map((city, index) => (
              <li key={index} className="cursor-pointer p-2 hover:bg-gray-200 text-black"
                  onClick={() => { setSelectedCity(city); closeModal(); }}>
                {city}
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-2">Такого региона нет</p>
          )}
        </ul>
      </div>
    </Dialog>
  );
}