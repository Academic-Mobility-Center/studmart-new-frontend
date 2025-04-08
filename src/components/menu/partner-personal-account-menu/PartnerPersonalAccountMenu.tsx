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
  { icon: "profile", label: "Профиль партнера" },
  { icon: "shopping", label: "Предложения" },
  { icon: "charts", label: "Статистика" },
  { icon: "docs", label: "Документы" },
  { icon: "faq", label: "FAQ" },
];

const StudentPersonalAccountMenu = () => {
  return (
    <nav className="flex flex-col w-[322px] gap-5 self-start pl-[40px]" aria-label="Меню личного кабинета">
      <ul className={menuWrapperClass}>
        {menuItems.map(({ icon, label }, index) => (
          <li key={icon}>
            <button className={buttonBaseClasses}>
              <img src={`/icons/partner-account/${icon}.svg`} className={iconClass} alt="" />
              <span className={textClass}>{label}</span>
            </button>
            {index < menuItems.length - 1 && <div className={sectionBorderClass} />}
          </li>
        ))}
      </ul>
      <button className={logoutButtonClass}>Выйти из аккаунта</button>
    </nav>
  );
};

export default StudentPersonalAccountMenu;
