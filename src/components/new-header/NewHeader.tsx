import Image from "next/image";
import Link from "next/link";

export default function NewHeader() {
  return (
    <header className="w-7xl bg-[#8fe248] flex items-center justify-start h-20 px-10 rounded-b-[30px]">
      <div className="w-[24.25%]">
        <Image src="/icons/Header/logo.svg" alt="" width={141} height={30} />
      </div>

      <nav className="w-[37.75%] px-4 flex items-center gap-10">
        <NavItem text="Предложения" url={"/partners"}/>
        <NavItem text="О сервисе" url={"/about"}/>
        <NavItem text="Партнерам" url={"/partners"}/>
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
