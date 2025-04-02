import Image from "next/image";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";

export default function NewHeader() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header className="w-7xl bg-[#8fe248] flex items-center justify-start h-20 px-10 rounded-b-[30px]">
      <div className="w-[24.25%]">
        <Link href="/personal-account">
          <Image src="/icons/Header/logo.svg" alt="" width={141} height={30} />
        </Link>
      </div>

      <nav className="w-[37.75%] px-4 flex items-center gap-10">
        <NavItem text="Предложения" url={"/partners"}/>
        <NavItem text="О сервисе" url={"/about"}/>
        <NavItem text="Партнерам" url={"/partners"}/>
      </nav>

        <div className="w-[42%] flex items-center gap-[23.5px] px-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={openModal}>
                <Image src="/icons/Header/location.svg" alt="" width={24} height={24} />
                <p className="text-sm text-[#032c28]">{selectedCity || "Выберите город"}</p>
            </div>
            <SearchBar />
            <div className="flex items-center gap-2">
                <Image src="/icons/Header/account.svg" alt="" width={24} height={24} />
                <Image src="/icons/Header/wallet.svg" alt="" width={24} height={24} />
            </div>
        </div>
        <CitySelectionModal isOpen={isModalOpen} closeModal={closeModal} setSelectedCity={setSelectedCity} />
    </header>
  );
}

function NavItem({ text, url }: { text: string, url: string }) {
  return (
    <div className="w-[99px] h-[18px] flex items-center">
      <Link href={url} className="text-sm font-bold text-[#032c28] m-0 p-0">{text}</Link>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="w-[201px] flex flex-col gap-1">
      <p className="text-sm text-[#032c28]">Поиск</p>
      <div className="border-t border-[#032c28]"></div>
    </div>
  );
}

function CitySelectionModal({ isOpen, closeModal, setSelectedCity }: { isOpen: boolean; closeModal: () => void; setSelectedCity: (city: string) => void }) {
  const [cities, setCities] = useState<string[]>([]);

  // useEffect(() => {
  //   fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json",
  //       "Authorization": "Token 99fc5827ba464a22c64b06aa3bda8fd9721ef5d8"
  //     },
  //     body: JSON.stringify({ query: "москва" })
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCities(data.suggestions.map((s: any) => s.value));
  //     });
  // }, []);
  useEffect(() => {
    fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token 99fc5827ba464a22c64b06aa3bda8fd9721ef5d8"
      },
      body: JSON.stringify({
        query: "",
        count: 50, // Увеличьте при необходимости
        locations_boost: [{ country: "Россия" }],
        from_bound: { value: "city" },
        to_bound: { value: "city" }
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setCities(data.suggestions.map((s: any) => s.value));
      });
  }, []);
  

  return (
    <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
      <div className="bg-white p-6 rounded-lg w-[900px] h-[900px] flex flex-col items-center">
        <h2 className="text-lg font-bold text-black">Выберите город</h2>
        <ul className="w-full overflow-auto">
          {cities.map((city, index) => (
            <li key={index} className="cursor-pointer p-2 hover:bg-gray-200 text-black" onClick={() => { setSelectedCity(city); closeModal(); }}>
              {city}
            </li>
          ))}
        </ul>
      </div>
    </Dialog>
  );
}