import Image from "next/image";

export default function NewHeader() {
  return (
    <header className="w-7xl bg-[#8fe248] flex items-center justify-start h-20 px-10 rounded-b-[30px]">
      <div className="w-[24.25%]">
        <Image src="/icons/Header/logo.svg" alt="" width={141} height={30} />
      </div>

      <nav className="w-[37.75%] px-4 flex items-center gap-10">
        <NavItem text="Предложения" />
        <NavItem text="О сервисе" />
        <NavItem text="Партнерам" />
      </nav>

        <div className="w-[42%] flex items-center gap-[23.5px] px-4">
            <div className="flex items-center gap-2">
                <Image src="/icons/Header/location.svg" alt="" width={24} height={24} />
                <p className="text-sm text-[#032c28]">Тюменская обл.</p>
            </div>
            <SearchBar />
            <div className="flex items-center gap-2">
                <Image src="/icons/Header/account.svg" alt="" width={24} height={24} />
                <Image src="/icons/Header/wallet.svg" alt="" width={24} height={24} />
            </div>
        </div>
    </header>
  );
}

function NavItem({ text }: { text: string }) {
  return (
    <div className="w-[99px] h-[18px] flex items-center">
      <p className="text-sm font-bold text-[#032c28] m-0 p-0">{text}</p>
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
