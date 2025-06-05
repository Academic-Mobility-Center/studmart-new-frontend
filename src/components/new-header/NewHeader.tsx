"use client";
import Image from "next/image";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getPromocodeRegions } from "@/lib/api/promocodes";
import { useCity } from "@/context/CityContext";
import SearchInputField from "@/components/fields/search_input/SearchInputField"
import { useRouter } from "next/navigation";
import PromoCardType from "@/types/PromoCard";
import { usePathname } from "next/navigation";
import {
  getPromocodePartners,
  getPromocodePartnersByRegionId,
} from "@/lib/api/promocodes";
import { transformPromos } from "@/app/home/context";
interface NewHeaderProps {
  isAuthenticated: boolean;
}

const citiesInModal = [
  {id: 1, name: "Новосибирская область"},
  {id: 2, name: "Московская область"}
]
interface Option {
  label: string;
  value: string;
}
export default function NewHeader({ isAuthenticated }: NewHeaderProps) {
  const { role } = useAuth();
  const router = useRouter();
  const {regionId} = useCity();
  const [partners, setPartners] = useState<PromoCardType[]>([]);
  useEffect(() => {
    const fetchPromoCards = async () => {
      try {
        let promoCardsArray;
        if (regionId) {
          promoCardsArray = await getPromocodePartnersByRegionId(regionId);
        } else {
          promoCardsArray = await getPromocodePartners();
        }
  
        const transformed = transformPromos(promoCardsArray || []);
        setPartners(transformed);
      } catch (error) {
        console.error("Error fetching promocodes:", error);
        setPartners([]);
      }
    };
  
    fetchPromoCards();
  }, [regionId]);
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: Option | null
  ) => {
    if (newValue) {
      router.push(`/partner-offer/${newValue.value}`);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { city } = useCity();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const isAuth = (isAuthenticated && role && role === "Employee") 
  ? "/partner-personal-account" 
  : isAuthenticated 
  ? "/student-personal-account" 
  : "/login";
    return (
    <header className="w-7xl bg-[#8fe248] flex items-center justify-start h-20 pl-[40px] rounded-b-[30px]">
      <div className="w-[320px]">
        <Link href="/home">
          <Image src="/icons/Header/logo.svg" alt="" width={141} height={30} />
        </Link>
      </div>

      <nav className="w-[430px] flex items-center gap-10">
        <NavItem text="Предложения" url={"/home"} isAuthenticated={true} />
        <NavItem text="О сервисе" url={"/about"} isAuthenticated={true} />
        <NavItem text="Партнерам" url={"/partners"} isAuthenticated={true} />
      </nav>

      <div className="w-[481px] flex items-center gap-[24px]">
        <div 
          className={`flex items-center gap-2 cursor-pointer`} 
          onClick={openModal}
        >
          <Image src="/icons/Header/location.svg" alt="" width={24} height={24} />
          <p className="text-sm text-[#032c28] max-w-[110px]">
            {city || "Выберите город"}
          </p>
        </div>
        <SearchBar isAuthenticated={isAuthenticated} handleChange={handleChange} partners={partners}/>
        <div className="flex items-center gap-2 pl-4">
          <Link href={isAuth}>
            <Image 
              src="/icons/Header/account.svg" 
              alt="" 
              width={24} 
              height={24} 
            />          
          </Link>
          <Link href={isAuthenticated && role === "Student" 
            ? "/student-personal-account/referal-program" : 
            isAuthenticated && role === "Employee" ? "" : "/login"}>
          <Image 
            src="/icons/Header/wallet.svg" 
            alt="" 
            width={24} 
            height={24} 
          /></Link>

        </div>
      </div>
      <CitySelectionModal isOpen={isModalOpen} closeModal={closeModal} />
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
  handleChange: (event: React.SyntheticEvent, newValue: Option | null) => void
  partners: PromoCardType[];
}

function SearchBar({ isAuthenticated, handleChange, partners }: SearchBarProps) {
  const pathname = usePathname();

  // Страницы, где должен быть показан текст-заглушка вместо поиска
  const isAuthPage = ["/login", "/login/reset-password", "/registration"].includes(pathname);

  const options: Option[] = partners.map(p => ({
    label: p.heading,
    value: p.id,
  }));

  return (
    <div className={`w-[201px] flex flex-col gap-1 ${!isAuthenticated ? "opacity-50" : ""}`}>
      {isAuthPage ? (
        <>
          <p className="text-sm text-[#032c28]">Поиск</p>
          <div className="border-t border-[#032c28]"></div>
        </>
      ) : (
        <SearchInputField
          placeholder="Поиск"
          options={options}
          handleChange={handleChange}
        />
      )}
    </div>
  );
}
function CitySelectionModal({ isOpen, closeModal }: { isOpen: boolean; closeModal: () => void; }) {
  const [cities, setCities] = useState<{id: number; name: string}[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { setCity } = useCity();
  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  useEffect(() => {
    const fetchCities = async () => {
      try{
        const response = await getPromocodeRegions();
        setCities(response);
      } catch (error) {
        console.error(error)
        setCities(citiesInModal)
      }
      
    };
    fetchCities();
  }, []);
  
  return (
    <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
      <div className="bg-white p-10 rounded-lg w-[700px] h-[700px] flex flex-col items-center">
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
                  onClick={() => { 
                  setCity(city.name, city.id.toString()); 
                  closeModal(); }}>
                {city.name}
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