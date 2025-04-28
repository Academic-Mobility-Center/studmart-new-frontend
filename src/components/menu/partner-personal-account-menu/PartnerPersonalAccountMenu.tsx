"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
const buttonBaseClasses =
  "w-full flex items-center gap-2.5 px-[19px] py-3 hover:bg-[#efefef] transition-colors h-16";
const iconClass = "w-6 h-6";
const textClass = "font-mulish text-sm font-normal text-[#032c28]";
const sectionBorderClass = "w-full h-px bg-[rgba(0,0,0,0.20)]";
const menuWrapperClass =
  "border bg-[#f8f8f8] rounded-[15px] border-solid border-[rgba(0,0,0,0.20)] overflow-hidden";
const logoutButtonClass =
  "border bg-[#f8f8f8] font-mulish text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] w-full h-12 cursor-pointer rounded-[15px] border-solid border-[rgba(0,0,0,0.20)] hover:bg-[#efefef] transition-colors";

const menuItems = [
  { icon: "profile", label: "Профиль партнера", href: "/partner-personal-account/profile" },
  { icon: "shopping", label: "Предложения", href: "/partner-personal-account/offers" },
  { icon: "charts", label: "Статистика", href: "/partner-personal-account/statistics/users" },
  { icon: "docs", label: "Документы", href: "/partner-personal-account/documents" },
  { icon: "faq", label: "FAQ", href: "/partner-personal-account/faq" },
];

const StudentPersonalAccountMenu = () => {
  const pathname = usePathname();  
  const {logout} = useAuth()
  return (
    <nav className="flex flex-col w-[322px] gap-5 self-start pl-[40px]">
      <ul className={menuWrapperClass}>
      {menuItems.map(({ icon, label, href }, index) => {
        const isActive =
          pathname === href ||
          (href === "/partner-personal-account/statistics/users" &&
          pathname.startsWith("/partner-personal-account/statistics"));

        return (
          <li key={icon}>
            <Link href={href}>
              <div className={`${buttonBaseClasses} ${isActive ? "bg-[#efefef]" : ""}`}>
                <Image src={`/icons/partner-account/${icon}.svg`} className={iconClass} alt="" width={24} height={24}/>
                <span className={textClass}>{label}</span>
              </div>
            </Link>
            {index < menuItems.length - 1 && <div className={sectionBorderClass} />}
          </li>
        );
      })}
      </ul>
      <button className={logoutButtonClass} onClick={logout}>Выйти из аккаунта</button>
    </nav>    
  );
};

export default StudentPersonalAccountMenu;
